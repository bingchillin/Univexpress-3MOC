"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaquetteSchema = exports.MaquetteValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("../services/mongoose"));
exports.MaquetteValidationSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    idArtiste: joi_1.default.number().required().positive(),
    url: joi_1.default.string().required(),
    dateSubmit: joi_1.default.date().required()
});
exports.MaquetteSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    idArtiste: { type: Number, required: true },
    url: { type: String, required: true },
    dateSubmit: { type: Date, required: true }
});
exports.default = mongoose_1.default.model('Maquette', exports.MaquetteSchema);
