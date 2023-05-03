import Crud from "../dal/_interface";
import { ApprobationRepository } from "../dal/mongoose/Approbation.Schema";
import { IApprobation, ApprobationUploadValidationSchema } from "./Approbation.Entity";


class ApprobationCrud implements Crud<IApprobation> {
    constructor(private repo: ApprobationRepository) {}

    async getAll(): Promise<IApprobation[]> {
        return await this.repo.getAll();
    }
    async getOne({ criteres }: { [key: string]: string; }): Promise<IApprobation | null> {
        return await this.repo.getOne({criteres});
    }
    
    update([{ criteres }, { changements }]: [{ [key: string]: string; }, { [key: string]: string; }]): Promise<number> {
        throw new Error("Method not implemented.");
    }
    
    async create(objets: IApprobation[]): Promise<IApprobation[]> {
        for (const approbation of objets) {

            const {error, value} = ApprobationUploadValidationSchema.validate(approbation);
            if (error) {

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