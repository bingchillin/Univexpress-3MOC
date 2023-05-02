import Crud from "../dal/_interface";
import {Approbations, ApprobationRepository } from "../dal/mongoose/Approbation.Schema";
import { IApprobation, ApprobationUploadValidationSchema } from "./Approbation.Entity";


class ApprobationCrud implements Crud<IApprobation> {
    constructor(private repo: ApprobationRepository) {}

    async getAll(): Promise<IApprobation[]> {
        return await this.repo.getAll();
    }
    async getOne({ criteres }: { [key: string]: string; }): Promise<IApprobation | null> {
        return await this.repo.getOne({criteres});
    }
    async update([{ criteres }, { changements }]: [{ [key: string]: string; }, { [key: string]: string; }]): Promise<number> {
        return await this.repo.update([{criteres}, {changements}]);
    }
    
    async create(objets: IApprobation[]): Promise<IApprobation[]> {
        for (const approbation of objets) {
            console.log("Approbation : %s", approbation);
            const {error, value} = ApprobationUploadValidationSchema.validate(approbation);
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

export default new ApprobationCrud(new ApprobationRepository());