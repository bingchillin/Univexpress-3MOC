import { IUser, UserByNicknameDTO, UserValidationSchema } from "./User.Entity";
import Crud from "../dal/_interface";
import {UsersRepository } from "../dal/mongoose/Users.Schema";

type User = IUser; 

class UsersCrud implements Crud<User> {
    constructor(private repo: UsersRepository) {}

    async getAll(): Promise<User[]> {
        return await this.repo.getAll();
    }

    async getAllManager(): Promise<User[]> {
        return await this.repo.getAllManager();
    }

    async getById(id: string) {
        return await this.repo.getById(id);
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

    async create(objets: [User]): Promise<User[]> {
        for (const user of objets) {
            const {error, value} = UserValidationSchema.validate(user);
            if (error) {

                throw JSON.stringify(error.details);
            }
        }

        return await this.repo.create(objets);
    }

    async delete([{criteres }]: [{ [key: string]: string; }]): Promise<number | void> {
        return await this.repo.delete([{criteres}]);
    }

    async getOneByNickname({nickname}: UserByNicknameDTO) {

        return await this.getOne({nickname}); 
    }

    async isNicknameTaken(nickname: string) {
        return await this.repo.isNicknameTaken(nickname);
    }

}

export default new UsersCrud(new UsersRepository());