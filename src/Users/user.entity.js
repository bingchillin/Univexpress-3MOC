"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidationSchema = exports.User = void 0;
const joi_1 = __importDefault(require("joi"));
// https://stackoverflow.com/questions/44480644/string-union-to-string-array
const ROLES = ['admin', 'manager', 'artist', 'user'];
class User {
    email;
    password;
    nickname;
    role;
    registrationDate;
    constructor(email, password, nickname, role) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.role = role;
        this.registrationDate = Date.now();
    }
}
exports.User = User;
exports.UserValidationSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    username: joi_1.default.string().alphanum().required(),
    password: joi_1.default.string().required().min(8),
    registrationDate: joi_1.default.number(),
    role: joi_1.default.string().valid(...ROLES).required(),
});
