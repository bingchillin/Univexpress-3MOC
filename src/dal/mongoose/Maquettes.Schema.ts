import mongoose, { Schema } from "mongoose";
import { IMaquette, Maquette } from "../../Maquettes/Maquettes.Entity";
import Crud from "../_interface";
import { Users, asUserPojo } from "./Users.Schema";

export const maquetteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    contents: {
        type: String,
        required: true,
    },
    dateSubmit: {
        type: Date,
        required: true,
    },
    owner: {
        required: false,
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
});


export const Maquettes = mongoose.model<IMaquette>("Maquettes", maquetteSchema);

export function asMaquettePojo(
    maquetteDoc: mongoose.Document<unknown, {}, IMaquette>
): IMaquette {
    const doc = maquetteDoc.toObject();
    return new Maquette(
        doc.name,
        doc.contents, 
        doc.dateSubmit, 
        doc.owner
        );
}

export class MaquettesRepository implements Crud<IMaquette>{
    async getAll(): Promise<IMaquette[]> {
        return await Maquettes.find();
    }
    async getOne({ ...criteres }: { [key: string]: string; }): Promise<IMaquette | null> {
        return await Maquettes.findOne({...criteres});
    }
    async update([{ ...criteres }, { changements }]: [{ [key: string]: string; }, { [key: string]: string; }]): Promise<number> {
        throw new Error("Method not implemented.");
    }
    async create(objets: IMaquette[]): Promise<IMaquette[]> {
        let maquettes = [];

        for(const maq of objets) {
            try {
                const own = maq.owner;
                maq.owner = await Users.findOne({email: maq.owner?.email})  ?? undefined;
                const maquette = new Maquettes(maq);
                await maquette.save();
                maq.owner = own;
                maquettes.push(maq);
            } catch(err) {
                console.error(err);
                throw err;
            }
        }
        return maquettes;
    }

    async delete([{ ...criteres }]: [{ [key: string]: string; }]): Promise<number> {
        throw new Error("Method not implemented.");
    }

    async getMany({ ...criteres }: { [key: string]: string; }) {
        return await Maquettes.find({...criteres});
        
    }
}