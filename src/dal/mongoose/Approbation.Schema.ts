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


export const Approbations = mongoose.model<IApprobation>("Approbation", approbationSchema);

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
        return await Approbations.find();
    }
    async getOne({ criteres }: { [key: string]: string; }): Promise<IMaquette | null> {
        return await Approbations.findOne({criteres});
    }
    async update([{ criteres }, { changements }]: [{ [key: string]: string; }, { [key: string]: string; }]): Promise<number> {
        throw new Error("Method not implemented.");
    }
    async create(objets: IApprobation[]): Promise<IApprobation[]> {
        let approbations = [];

        for(const ob of objets) {
            try {
                const approbation = new Approbations(ob);
                await approbation.save();
                approbations.push(asApprobationPojo(approbation));
            } catch(err) {
                console.error(err);
                throw err;
            }
        }
        return approbations;
    }
    async delete([{ criteres }]: [{ [key: string]: string; }]): Promise<number> {
        throw new Error("Method not implemented.");
    }
}