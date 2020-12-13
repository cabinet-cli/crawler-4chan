import * as yup from "yup";
import { Crawler, Node, RuleBase } from "@cabinet-cli/core";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FourChanCrawlerRule extends RuleBase {}

export default class FourChanCrawler extends Crawler<FourChanCrawlerRule> {
    public getRuleScheme(): yup.ObjectSchemaDefinition<Omit<FourChanCrawlerRule, "type">> {
        return {};
    }

    public async run(): Promise<Node[]> {
        return Promise.resolve([]);
    }
}
