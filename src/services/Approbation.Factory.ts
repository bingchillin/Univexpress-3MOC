import { IApprobation } from "../Approbations/Approbation.Entity";
import { IUser } from "../Users/User.Entity";

export function makeApprobation(approbation: IApprobation, user: IUser) {
    approbation.voter = user;
    return approbation;
}