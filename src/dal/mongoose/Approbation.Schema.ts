import mongoose, { Schema } from "mongoose";
import { IApprobation, Approbation } from "../../Approbation/Approbation.Entity";
import Crud from "../_interface";
import { asUserPojo } from "./Users.Schema";

export const approbationSchema = new Schema({
    flag: {
        type: String,
        required: true
    },
    contents: {
        type: String,
        required: true,
    },
    maquette: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Maquettes'
    },
    owner: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
});


export const Approbation = mongoose.model<IApprobation>("Approbation", approbationSchema);

export function asApprobationPojo(
    approbationDoc: mongoose.Document<unknown, {}, IApprobation>
): IApprobation {
    const doc = approbationDoc.toObject();
    return new Approbation(
        doc.flag,
        doc.contents,
        doc.maquette,
        doc.owner
        );
}

export class ApprobationRepository implements Crud<IApprobation>{
    async getAll(): Promise<IApprobation[]> {
        return await Approbation.find();
    }
    async getOne({ criteres }: { [key: string]: string; }): Promise<IMaquette | null> {
        return await Approbation.findOne({criteres});
    }
    async update([{ criteres }, { changements }]: [{ [key: string]: string; }, { [key: string]: string; }]): Promise<number> {
        throw new Error("Method not implemented.");
    }
    async create(objets: IApprobation[]): Promise<IApprobation[]> {
        let approbation = [];

        for(const ob of objets) {
            try {
                const approbation = new Approbation(ob);
                await approbation.save();
                approbation.push(asApprobationPojo(approbation));
            } catch(err) {
                console.error(err);
                throw err;
            }
        }
        return approbation;
    }
    async delete([{ criteres }]: [{ [key: string]: string; }]): Promise<number> {
        throw new Error("Method not implemented.");
    }
}