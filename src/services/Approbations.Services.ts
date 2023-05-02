import { IApprobation } from "../Approbations/Approbation.Entity";
import ApprobationRepo from "../Approbations/Approbation.Repo";
import { IMaquette } from "../Maquettes/Maquettes.Entity";
import MaquettesRepo from "../Maquettes/Maquettes.Repo";
import { IUser } from "../Users/User.Entity";

export function makeApprobation(approbation: IApprobation, user: IUser) {
    approbation.voter = user;
    return approbation;
}

/**
 * Retourn true si validé, false si non validé, null si tous
 * les manager ont pas encore votés
 */
export function isValidated(maquette: IMaquette): boolean | null {

    const approbations = ApprobationRepo.getMany({maquette: maquette});

    console.log("approbations %s", JSON.stringify(approbations));

    return null;
}