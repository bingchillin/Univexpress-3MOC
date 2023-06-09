import {describe, test, expect, beforeAll, afterAll} from "@jest/globals";
import {Server} from "http";
import app from "./index.express";

let server: Server;
let to: NodeJS.Timeout;

describe("index.ts hello", () => {
    beforeAll(async () => {
        to = setTimeout(() => server = app.listen(4000), 0);
    });
    
    afterAll((done) => {
        to.unref();
        server.close(done);
    });
    
    test("Main route to return hello", async () => {
        const f = await fetch("http://localhost:4000");

        expect(f.ok).toBeTruthy();
    });

    test("Main route to return \"Hello world\"", async () => {
        const f = await fetch("http://localhost:4000");
        const res = await f.text();

        expect(res).toBe("Hello world");
    });
});
