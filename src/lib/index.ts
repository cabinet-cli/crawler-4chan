import * as yup from "yup";
import flattenDeep from "lodash.flattendeep";
import { Crawler, Node, RuleBase } from "@cabinet-cli/core";

import { FourChanBoard, FourChanOPThread } from "./types";

interface FourChanCrawlerKeyword {
    title?: string;
    content?: string;
}

interface FourChanCrawlerRule extends RuleBase {
    boards: string[];
    keywords?: Array<string | FourChanCrawlerKeyword>;
}

export default class FourChanCrawler extends Crawler<FourChanCrawlerRule> {
    public constructor() {
        super("4chan");
    }

    public async getBoards(): Promise<FourChanBoard[]> {
        try {
            const data = await this.fetcher.fetchJSON<{ boards: FourChanBoard[] }>("https://a.4cdn.org/boards.json");
            if (!data) {
                throw new Error("Undefined error");
            }

            return data.boards;
        } catch (e) {
            throw new Error(`Failed to fetch 4chan.org boards: ${e.message}`);
        }
    }
    public async getOPThreadsFromBoard(boardCode: string): Promise<FourChanOPThread[]> {
        try {
            const data = await this.fetcher.fetchJSON<[{ page: number; threads: FourChanOPThread[] }]>(
                `https://a.4cdn.org/${boardCode}/catalog.json`,
            );

            if (!data) {
                throw new Error("Undefined error");
            }

            return flattenDeep(data.map(page => page.threads));
        } catch (e) {
            throw new Error(`Failed to fetch 4chan.org op threads: ${e.message}`);
        }
    }

    public getRuleScheme(): yup.ObjectSchemaDefinition<Omit<FourChanCrawlerRule, "type">> {
        return {
            boards: yup.array<string>().of(yup.string().required()).required(),
            keywords: yup.array<string | FourChanCrawlerKeyword>().of(
                yup.lazy(value =>
                    typeof value === "string"
                        ? yup.string().required()
                        : yup
                              .object<FourChanCrawlerKeyword>()
                              .shape<FourChanCrawlerKeyword>({
                                  title: yup.string(),
                                  content: yup.string(),
                              })
                              .required(),
                ),
            ),
        };
    }

    public async run(rule: FourChanCrawlerRule): Promise<Node[]> {
        const boards = await this.getBoards();
        const result: Node[] = [];
        for (const boardCode of rule.boards) {
            const targetBoard = boards.find(board => board.board === boardCode);
            if (!targetBoard) {
                throw new Error(`There are board code supplied that doesn't exist on 4chan.org: /${boardCode}/`);
            }

            const opThreads = await this.getOPThreadsFromBoard(targetBoard.board);
            if (rule.keywords) {
                const matchingThreads = [];
                for (const thread of opThreads) {
                    const matched = rule.keywords.some(keyword => {
                        if (typeof keyword === "string" && thread.sub) {
                            return thread.sub.indexOf(keyword) > 0;
                        }

                        if (typeof keyword === "string" && thread.com) {
                            return thread.com.indexOf(keyword) > 0;
                        }

                        if (typeof keyword === "object") {
                            if (keyword.title && thread.sub) {
                                return thread.sub.indexOf(keyword.title) > 0;
                            }

                            if (keyword.content && thread.com) {
                                return thread.com.indexOf(keyword.content) > 0;
                            }
                        }
                    });

                    if (!matched) {
                        continue;
                    }

                    matchingThreads.push(thread);
                }
            }
        }

        return result;
    }
}
