import {createServer, app} from "./index";
import {describe, test, expect, beforeAll, afterAll} from "@jest/globals";
import {Server} from "http";

let server: Server;
beforeAll(() => {
    setTimeout(() => server = createServer(app, 3000), 0);
})
afterAll(async () => server.close(() => 0));
describe("index.ts hello", () => {

    test("Main route to return hello", async () => {
        const f = await fetch('http://localhost:3000');

        expect(f.ok).toBeTruthy();

        const res = await f.text();

        expect(res).toBe('Hello world');
    })
})