import Crud from "../dal/_interface";
import { ApprobationsRepository } from "../dal/mongoose/Approbations.Schema";
import { ApprobationValidationSchema, IApprobation } from "./Approbation.Entity";

class ApprobationsCrud implements Crud<IApprobation> {
    constructor(private repo: ApprobationsRepository) {}


    getAll(): Promise<IApprobation[]> {
        throw new Error("Method not implemented.");
    }
    getOne({ criteres }: { [key: string]: string; }): Promise<IApprobation | null> {
        throw new Error("Method not implemented.");
    }
    update([{ criteres }, { changements }]: [{ [key: string]: string; }, { [key: string]: string; }]): Promise<number> {
        throw new Error("Method not implemented.");
    }
    async create(objets: IApprobation[]): Promise<IApprobation[]> {
        for (const approbation of objets) {
            console.log("approbation : %s", approbation);
            const {error, value} = ApprobationValidationSchema.validate(approbation);
            if (error) {
                console.log(JSON.stringify(error.details));
                throw JSON.stringify(error.details);
            }
        }

        return await this.repo.create(objets);
    }

    delete([{ criteres }]: [{ [key: string]: string; }]): Promise<number> {
        throw new Error("Method not implemented.");
    }

    async getMany({ criteres }: { [key: string]: any; }) {
        return await this.repo.getMany({criteres});
    }

}

export default new ApprobationsCrud(new ApprobationsRepository());