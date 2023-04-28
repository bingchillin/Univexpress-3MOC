import { IUser, UserByNicknameDTO } from "./User.Entity";
import Crud from "../dal/_interface";
import {Users, UsersRepository } from "../dal/mongoose/Users.Schema";

type User = IUser; 

class UsersCrud implements Crud<User> {
    constructor(private repo: UsersRepository) {}

    async getAll(): Promise<User[]> {
        return await this.repo.getAll();
    }

    async getOne({ ...criteres }: { [key : string]: any; }): Promise<User | null> {

        return await this.repo.getOne({...criteres});
    }

    async update([
        { ...criteres }, 
        { changements }
    ]: [Partial<{ [key in keyof IUser]: any; }>, { [key: string]: string; }]): Promise<number> {
        return await this.repo.update([{...criteres}, {changements}]);
    }

    async create(objets: [User]): Promise<number> {
        return await this.repo.create(objets);
    }

    async delete([{criteres }]: [{ [key: string]: string; }]): Promise<number> {
        return await this.repo.delete([{criteres}]);
    }

    async getOneByNickname({nickname}: UserByNicknameDTO) {

        return await this.getOne({nickname}); 
    }
}

export default new UsersCrud(new UsersRepository());