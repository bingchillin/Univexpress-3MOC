import Crud from "../dal/_interface";
import {Maquettes, MaquettesRepository } from "../dal/mongoose/Maquettes.Schema";
import { IMaquette, MaquetteUploadDto, MaquetteUploadValidationSchema } from "./Maquettes.Entity";


class MaquettesCrud implements Crud<IMaquette> {
    constructor(private repo: MaquettesRepository) {}

    async getAll(): Promise<IMaquette[]> {
        return await this.repo.getAll();
    }
    async getOne({ criteres }: { [key: string]: string; }): Promise<IMaquette | null> {
        return await this.repo.getOne({criteres});
    }
    async update([{ criteres }, { changements }]: [{ [key: string]: string; }, { [key: string]: string; }]): Promise<number> {
        return await this.repo.update([{criteres}, {changements}]);
    }
    
    async create(objets: IMaquette[]): Promise<IMaquette[]> {
        for (const maquette of objets) {
            console.log("maquette : %s", maquette);
            const {error, value} = MaquetteUploadValidationSchema.validate(maquette);
            if (error) {
                console.log(JSON.stringify(error.details));
                throw JSON.stringify(error.details);
            }
        }

        return await this.repo.create(objets);
    }
    
    async delete([{criteres }]: [{ [key: string]: string; }]): Promise<number> {
        return await this.repo.delete([{criteres}]);
    }
}

export default new MaquettesCrud(new MaquettesRepository());