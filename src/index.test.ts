import {describe, test, expect, beforeAll, afterAll} from "@jest/globals";
import {Server} from "http";
import express from 'express';

let server: Server;
import app from "./ihm/serveurExpress";


beforeAll(async () => {
    setTimeout(() => server = app.listen(3000, ()=> console.log("Serveur de test en ecoute sur 3000")), 0);
});

afterAll(async () => server.close(() => 0));

describe("index.ts hello", () => {

    test("Main route to return hello", async () => {
        const f = await fetch('http://localhost:3000');

        expect(f.ok).toBeTruthy();
    });

    test("Main route to return \"Hello world\"", async () => {
        const f = await fetch('http://localhost:3000');
        const res = await f.text();

        expect(res).toBe('Hello world');
    })
});