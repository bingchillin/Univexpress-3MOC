"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maquetteSchema = void 0;
const mongoose_1 = require("mongoose");
exports.maquetteSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    url: String,
    dateSubmit: Date
});
