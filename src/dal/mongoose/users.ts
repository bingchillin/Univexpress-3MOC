import mongoose, { Schema } from 'mongoose';
import { IUser } from '../../Users/user.entity';
import Crud from '../_interface';


export const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        required: true,
    },
    nickname: {
        type: String,
        required: false,
    },
});

export const Users = mongoose.model<IUser>('Users', userSchema);

export class UsersRepository implements Crud<typeof Users>{
    async getAll(): Promise<typeof Users[]> {
        return await Users.find();
    }
    async getOne({ criteres }: { [key: string]: string; }): Promise<typeof Users | null> {
        return await Users.findOne({criteres});
    }
    async update([{ criteres }, { changements }]: [{ [key: string]: string; }, { [key: string]: string; }]): Promise<number> {
        throw new Error('Method not implemented.');
    }
    async create(objets: typeof Users[]): Promise<number> {
        let inserts = 0;

        for(const ob of objets) {
            try {
                const maquette = new Users(ob);
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