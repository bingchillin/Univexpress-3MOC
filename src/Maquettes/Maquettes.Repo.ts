import Crud from "../dal/_interface";
import { MaquettesRepository } from "../dal/mongoose/Maquettes.Schema";
import { IMaquette, MaquetteUploadValidationSchema } from "./Maquettes.Entity";


class MaquettesCrud implements Crud<IMaquette> {
    constructor(private repo: MaquettesRepository) {}

    async getAll(): Promise<IMaquette[]> {
        return await this.repo.getAll();
    }

    async getOne({ ...criteres }: { [key: string]: string; }): Promise<IMaquette | null> {
        
        return await this.repo.getOne({...criteres});
    }

    async update([{ criteres }, { changements }]: [{ [key: string]: string; }, { [key: string]: string; }]): Promise<number> {
        return await this.repo.update([{criteres}, {changements}]);
    }
    
    async create(objets: IMaquette[]): Promise<IMaquette[]> {
        for (const maquette of objets) {

            const {error, value} = MaquetteUploadValidationSchema.validate(maquette);
            if (error) {

                throw JSON.stringify(error.details);
            }
        }

        return await this.repo.create(objets);
    }
    
    async delete([{criteres }]: [{ [key: string]: string; }]): Promise<number> {
        return await this.repo.delete([{criteres}]);
    }

    async getMany({ criteres }: { [key: string]: string; }) {
        return await this.repo.getMany({criteres});
    }
}

export default new MaquettesCrud(new MaquettesRepository());