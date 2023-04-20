"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoUrl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
exports.mongoUrl = `mongodb://${config_1.default.MONGO_USER}:${config_1.default.MONGO_PASSWORD}@${config_1.default.MONGO_HOST}:${config_1.default.MONGO_PORT}/${config_1.default.MONGO_DB}`;
exports.default = mongoose_1.default;
