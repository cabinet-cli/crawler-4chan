import fetchMock from "jest-fetch-mock";

import { Provider } from "@cabinet-cli/core";

import FourChanCrawler from ".";

describe("FourChanCrawler", () => {
    it("checks validation of given rule properly", async () => {
        const provider = new Provider(new FourChanCrawler());

        await expect(async () => {
            await provider.doRun({
                type: "4chan",
                boards: ([123] as any) as string[],
            });
        }).rejects.toThrow();
    });

    it("crawls board list on 4chan.org properly", async () => {
        const provider = new FourChanCrawler();
        const boards = await provider.getBoards();

        expect(boards).not.toBeNull();
    });

    it("crawls threads from given board codes properly", async () => {
        const provider = new FourChanCrawler();
        await expect(provider.getOPThreadsFromBoard("wsg")).resolves.not.toThrow();
    });

    it("throws an error when it fails to fetch board list from 4chan.org", async () => {
        fetchMock.mockOnceIf(/^https?:\/\/a.4cdn.org.*$/, async () => {
            return {
                status: 404,
                body: "Not Found",
            };
        });

        const provider = new FourChanCrawler();
        await expect(provider.getBoards()).rejects.toThrow();
    });

    it("throws an error when it fails during fetch op threads from 4chan.org", async () => {
        fetchMock.mockOnceIf(/^https?:\/\/a.4cdn.org.*$/, async () => {
            return {
                status: 404,
                body: "Not Found",
            };
        });

        const provider = new FourChanCrawler();
        await expect(provider.getOPThreadsFromBoard("wsg")).rejects.toThrow();
    });

    it("crawls matching threads by provided rule", async () => {
        const crawler = new FourChanCrawler();

        await expect(
            (async () => {
                const threads = await crawler.run({
                    type: "4chan",
                    boards: ["wsg"],
                });

                return threads.length > 0;
            })(),
        ).resolves.toBe(true);
    });

    it("throws an error when given rule contains board not existing", async () => {
        const crawler = new FourChanCrawler();
        await expect(
            crawler.run({
                type: "4chan",
                boards: ["boardcodethatshuldnotexist"],
            }),
        ).rejects.toThrow();
    });
});
