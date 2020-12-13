import * as yup from "yup";
import flattenDeep from "lodash.flattendeep";
import { Crawler, Node, RuleBase } from "@cabinet-cli/core";

import { FourChanBoard, FourChanOPThread } from "./types";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FourChanCrawlerRule extends RuleBase {
    boards: string[];
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
            result.push(
                ...opThreads.map(thread => ({
                    title: thread.sub,
                    content: thread.com,
                })),
            );
        }

        return result;
    }
}
