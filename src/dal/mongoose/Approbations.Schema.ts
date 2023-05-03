import mongoose, { Schema } from "mongoose";
import { Approbation, IApprobation } from "../../Approbations/Approbation.Entity";
import Crud from "../_interface";
import { Users } from "./Users.Schema";
import { Maquettes } from "./Maquettes.Schema";

export const approbationsSchema = new Schema({
    isPositive: {
        type: Boolean,
        required: true,
    },
    voter: {
        requireed: true,
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    maquette: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Maquettes",
    },
    comment: {
        type: String,
        required: true,
    },
});

export const Approbations = mongoose.model<typeof approbationsSchema>(
    "Approbations", approbationsSchema
);

export class ApprobationsRepository implements Crud<IApprobation> {
    getAll(): Promise<IApprobation[]> {
        throw new Error("Method not implemented.");
    }
    getOne({ criteres }: { [key: string]: string; }): Promise<IApprobation | null> {
        throw new Error("Method not implemented.");
    }
    update([{ criteres }, { changements }]: [{ [key: string]: string; }, { [key: string]: string; }]): Promise<number> {
        throw new Error("Method not implemented.");
    }
    async create(objets: IApprobation[]): Promise<IApprobation[]> {
        const approbations = [];

        for(const appr of objets) {
            try {
                const vot = appr.voter;
                const maq = appr.maquette;
                appr.voter = await Users.findOne({email: appr.voter?.email})  ?? undefined;
                appr.maquette = await Maquettes.findOne({name: appr.maquette?.name})  ?? undefined;
                const approbation = new Approbations(appr);
                await approbation.save();
                appr.voter = vot;
                appr.maquette = maq;
                approbations.push(appr);
            } catch(err) {
                console.error(err);
                throw err;
            }
        }
        return approbations;

    }
    delete([{ criteres }]: [{ [key: string]: string; }]): Promise<number> {
        throw new Error("Method not implemented.");
    }

    async getMany({ criteres }: { [key: string]: string; }) {
        return await Approbations.find({criteres});
        
    }

}