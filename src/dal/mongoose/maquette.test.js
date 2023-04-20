"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const mongoose_1 = __importStar(require("../../services/mongoose"));
const maquette_1 = require("./maquette");
/**
 * https://zellwk.com/blog/jest-and-mongoose/
 */
(0, globals_1.beforeAll)(async () => {
    console.log(mongoose_1.mongoUrl);
    await mongoose_1.default.connect(mongoose_1.mongoUrl);
    await maquette_1.Maquettes.deleteMany();
});
(0, globals_1.afterAll)(async () => {
    // await mongoose.connection.close();
});
(0, globals_1.describe)("dal mongoose maquette", () => {
    (0, globals_1.test)("mongoose est connecté", () => {
        (0, globals_1.expect)(mongoose_1.default.connection).toBeTruthy();
    });
    (0, globals_1.test)("repo est vide", async () => {
        const maquettes = await maquette_1.Maquettes.find();
        console.log(maquettes);
        (0, globals_1.expect)(maquettes).toHaveLength(0);
    });
});
