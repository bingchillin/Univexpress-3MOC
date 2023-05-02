import { IApprobation } from "../Approbations/Approbation.Entity";
import { IMaquette } from "../Maquettes/Maquettes.Entity";
import MaquettesRepo from "../Maquettes/Maquettes.Repo";
import { IUser } from "../Users/User.Entity";

export function makeApprobation(approbation: IApprobation, user: IUser) {
    approbation.voter = user;
    return approbation;
}

export function isValidated(maquette: IMaquette): boolean {

    const approbations = MaquettesRepo
}