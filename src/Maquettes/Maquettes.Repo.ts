import Crud from "../dal/_interface";
import {Maquettes, MaquettesRepository } from "../dal/mongoose/Maquettes.Schema";

type Maquette = typeof Maquettes; 

class MaquettesCrud implements Crud<Maquette> {
    constructor(private repo: MaquettesRepository) {}

    async getAll(): Promise<Maquette[]> {
        return await this.repo.getAll();
    }
    async getOne({ criteres }: { [key: string]: string; }): Promise<Maquette | null> {
        return await this.repo.getOne({criteres});
    }
    async update([{ criteres }, { changements }]: [{ [key: string]: string; }, { [key: string]: string; }]): Promise<number> {
        return await this.repo.update([{criteres}, {changements}]);
    }
    async create(objets: [Maquette]): Promise<number> {
        return await this.repo.create(objets);
    }
    async delete([{criteres }]: [{ [key: string]: string; }]): Promise<number> {
        return await this.repo.delete([{criteres}]);
    }
}