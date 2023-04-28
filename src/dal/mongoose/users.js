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
exports.UsersRepository = exports.Users = exports.userSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        required: true,
    },
    nickname: {
        type: String,
        required: false,
    },
});
exports.Users = mongoose_1.default.model("Users", exports.userSchema);
class UsersRepository {
    async getAll() {
        return await exports.Users.find();
    }
    async getOne({ ...criteres }) {
        return await exports.Users.findOne({ ...criteres });
    }
    async update([{ ...criteres }, { changements }]) {
        throw new Error("Method not implemented.");
    }
    async create(objets) {
        let inserts = 0;
        for (const ob of objets) {
            try {
                const maquette = new exports.Users(ob);
                await maquette.save();
                inserts++;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        }
        return inserts;
    }
    async delete([{ criteres }]) {
        throw new Error("Method not implemented.");
    }
}
exports.UsersRepository = UsersRepository;
