import Joi from "joi";
import { IUser, UserValidationSchema } from "../Users/User.Entity";
import { IMaquette, MaquetteUploadValidationSchema } from "../Maquettes/Maquettes.Entity";
import { Types } from "mongoose";

export interface IApprobation {
    flag: String;
    contents: string;
    maquette: IMaquette;
    owner: IUser;
}

export const ApprobationUploadValidationSchema = Joi.object({
    flag: Joi.string().required(),
    contents: Joi.string().required(),
    maquette: MaquetteUploadValidationSchema,
    owner: UserValidationSchema,
});

export class Approbation implements IApprobation {
    constructor(
        public flag: String,
        public contents: string,
        public maquette: IMaquette,
        public owner: IUser) {}
}