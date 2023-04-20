"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MaquetteMongoose {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async getAll() {
        return await this.repo.getAll();
    }
    async getOne({ criteres }) {
        return await this.repo.getOne({ criteres });
    }
    async update([{ criteres }, { changements }]) {
        return await this.repo.update([{ criteres }, { changements }]);
    }
    async create(objets) {
        return await this.repo.create(objets);
    }
    async delete([{ criteres }]) {
        return await this.repo.delete([{ criteres }]);
    }
}
