import { Schema } from 'mongoose';

export const maquetteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    url: String,
    dateSubmit: Date
});