import mongoose, { Schema } from "mongoose";
import { IMaquette } from "../../Maquettes/Maquettes.Entity";
import Crud from "../_interface";

export const maquetteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
    },
    dateSubmit: {
        type: Date,
        required: true,
    },
    owner: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
});

export const Maquettes = mongoose.model<IMaquette>("Maquettes", maquetteSchema);

export class MaquettesRepository implements Crud<typeof Maquettes>{
    async getAll(): Promise<typeof Maquettes[]> {
        return await Maquettes.find();
    }
    async getOne({ criteres }: { [key: string]: string; }): Promise<typeof Maquettes | null> {
        return await Maquettes.findOne({criteres});
    }
    async update([{ criteres }, { changements }]: [{ [key: string]: string; }, { [key: string]: string; }]): Promise<number> {
        throw new Error("Method not implemented.");
    }
    async create(objets: IMaquette[]): Promise<IMaquette[]> {
        let maquettes = [];

        for(const ob of objets) {
            try {
                const maquette = new Maquettes(ob);
                await maquette.save();
                maquettes.push(maquette.toObject());
            } catch(err) {
                console.error(err);
                throw err;
            }
        }
        return maquettes;
    }
    async delete([{ criteres }]: [{ [key: string]: string; }]): Promise<number> {
        throw new Error("Method not implemented.");
    }
}