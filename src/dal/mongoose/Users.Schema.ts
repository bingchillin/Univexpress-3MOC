import mongoose, { Schema } from "mongoose";
import { IUser, User } from "../../Users/User.Entity";
import Crud from "../_interface";


export const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
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
    role: {
        type: String,
        required: true
    }
});

export function asUserPojo(userDoc: mongoose.Document<unknown, {}, IUser> | IUser): {[Property in keyof IUser]: any} {
    if(!(userDoc instanceof mongoose.Document)) {
        return userDoc;
    }
    const doc = userDoc.toObject();
    return {
        email: doc.email, 
        password: doc.password ?? "*deleted*", 
        nickname: doc.nickname, 
        role: doc.role,
        registrationDate: doc.registrationDate
    };
}

export const Users = mongoose.model<IUser>("Users", userSchema);


export class UsersRepository implements Crud<IUser>{

    async getAll(): Promise<IUser[]> {
        return await Users.find();
    }
    async getOne({ ...criteres }: { [key: string]: string; }): Promise<IUser | null> {

        const user = await Users.findOne({...criteres});
        
        if(!user) return null;

        return asUserPojo(user) ?? null;
    }

    async getById(id: string) {
        return await Users.findById(id);
    }
    
    async update([{ ...criteres }, { changements }]: [{ [key: string]: string; }, { [key: string]: string; }]): Promise<number> {
        throw new Error("Method not implemented.");
    }

    async create(objets: IUser[]): Promise<User[]> {
        // this.Users.on('index', async (err) => {
            const users = [];

            for(const ob of objets) {
                try {
                    const maquette = new Users(ob);
                    await maquette.save();
                    users.push(maquette.toObject());
                } catch(err) {
                    console.error(err);
                    throw err;
                }
            }
            return users; 
        // });
    }
    async delete(users: [{ [key: string]: string; }]): Promise<void> {
        for(const user of users) {
            await Users.deleteOne({...user});
        }
    }
}