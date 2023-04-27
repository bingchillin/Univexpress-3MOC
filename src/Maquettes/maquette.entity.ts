import Joi from "joi";
import mongoose from '../services/mongoose';

export interface IMaquette extends mongoose.Document {
    name: string;
    idArtiste: number;
    url: string;
    dateSubmit: Date;
}

export const MaquetteValidationSchema = Joi.object({
    name: Joi.string().required(),
    idArtiste: Joi.number().required().positive(),
    url: Joi.string().required(),
    dateSubmit: Joi.date().required()
});

export const MaquetteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    idArtiste: { type: Number, required: true },
    url: { type: String, required: true },
    dateSubmit: { type: Date, required: true }
});

export default mongoose.model<IMaquette>('Maquette', MaquetteSchema);
