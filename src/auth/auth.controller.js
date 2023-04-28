"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Users_Repo_1 = __importDefault(require("../Users/Users.Repo"));
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../services/config"));
const Users_Repo_2 = __importDefault(require("../Users/Users.Repo"));
const authController = (0, express_1.Router)();
authController.get("/login", (req, res) => {
    res.send("Ok");
});
authController.post("/login", async (req, res) => {
    const pl = req.body;
    const user = await Users_Repo_1.default.getOne({ email: pl.email });
    if (!user) {
        res.status(404).send("User not found");
        return;
    }
    if (pl.password != user.password) {
        res.status(http_status_codes_1.StatusCodes.FORBIDDEN).send("Forbidden");
        return;
    }
    const token = jsonwebtoken_1.default.sign(pl, config_1.default.JWT_SECRET, { expiresIn: "1800s" });
    res.json(token);
    return;
});
authController.post("/login", async (req, res) => {
    const pl = req.body;
    const user = await Users_Repo_1.default.getOne({ email: pl.email });
    if (!user) {
        res.status(404).send("User not found");
        return;
    }
    if (pl.password != user.password) {
        res.status(http_status_codes_1.StatusCodes.FORBIDDEN).send("Forbidden");
        return;
    }
    const token = jsonwebtoken_1.default.sign(pl, config_1.default.JWT_SECRET, { expiresIn: "1800s" });
    res.json(token);
    return;
});
authController.post("/register", async (req, res) => {
    try {
        debugger;
        const num = await Users_Repo_2.default.create([req.body]);
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send(err);
        return;
    }
    const token = jsonwebtoken_1.default.sign(req.body, config_1.default.JWT_SECRET, { expiresIn: "1800s" });
    res.json(token);
    return;
});
exports.default = authController;
