"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maquettesRouter = void 0;
const express_1 = require("express");
exports.maquettesRouter = (0, express_1.Router)();
exports.maquettesRouter.get("/", (req, res) => {
    return res.json("OK");
});
