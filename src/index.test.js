"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
let server;
const serveurExpress_1 = __importDefault(require("./ihm/serveurExpress"));
(0, globals_1.beforeAll)(async () => {
    setTimeout(() => server = serveurExpress_1.default.listen(3000, () => console.log("Serveur de test en ecoute sur 3000")), 0);
});
(0, globals_1.afterAll)(async () => server.close(() => 0));
(0, globals_1.describe)("index.ts hello", () => {
    (0, globals_1.test)("Main route to return hello", async () => {
        const f = await fetch('http://localhost:3000');
        (0, globals_1.expect)(f.ok).toBeTruthy();
    });
    (0, globals_1.test)("Main route to return \"Hello world\"", async () => {
        const f = await fetch('http://localhost:3000');
        const res = await f.text();
        (0, globals_1.expect)(res).toBe('Hello world');
    });
});
