import mongoose, { Schema } from 'mongoose';
import { IMaquette } from '../../Maquettes/maquette.entity';
import Crud from '../_interface';


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
});

export const Maquettes = mongoose.model<IMaquette>('Maquettes', maquetteSchema);

export class MaquettesRepository implements Crud<typeof Maquettes>{
    async getAll(): Promise<typeof Maquettes[]> {
        return await Maquettes.find();
    }
    async getOne({ criteres }: { [key: string]: string; }): Promise<typeof Maquettes | null> {
        return await Maquettes.findOne({criteres});
    }
    async update([{ criteres }, { changements }]: [{ [key: string]: string; }, { [key: string]: string; }]): Promise<number> {
        throw new Error('Method not implemented.');
    }
    async create(objets: typeof Maquettes[]): Promise<number> {
        let inserts = 0;

        for(const ob of objets) {
            try {
                const maquette = new Maquettes(ob);
                maquette.save();
                inserts++;
            } catch(err) {
                console.error(err);
                continue;
            }
        }
        return inserts;
    }
    async delete([{ criteres }]: [{ [key: string]: string; }]): Promise<number> {
        throw new Error('Method not implemented.');
    }

}