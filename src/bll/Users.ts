import Crud from "../dal/_interface";
import {Users, UsersRepository } from "../dal/mongoose/users";

type User = typeof Users; 

class UsersCrud implements Crud<User> {
    constructor(private repo: UsersRepository) {}

    async getAll(): Promise<User[]> {
        return await this.repo.getAll();
    }
    async getOne({ criteres }: { [key: string]: string; }): Promise<User | null> {
        return await this.repo.getOne({criteres});
    }
    async update([{ criteres }, { changements }]: [{ [key: string]: string; }, { [key: string]: string; }]): Promise<number> {
        return await this.repo.update([{criteres}, {changements}]);
    }
    async create(objets: [User]): Promise<number> {
        return await this.repo.create(objets);
    }
    async delete([{criteres }]: [{ [key: string]: string; }]): Promise<number> {
        return await this.repo.delete([{criteres}]);
    }
}