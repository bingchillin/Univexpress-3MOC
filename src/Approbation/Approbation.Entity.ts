import Joi from "joi";
import { IUser, UserValidationSchema } from "../Users/User.Entity";
import { IMaquette, MaquetteUploadValidationSchema } from "../Maquettes/Maquettes.Entity";
import { Types } from "mongoose";

export interface IApprobation {
    flag: number;
    contents: string;
    maquette: IMaquette;
    owner: IUser;
}

export const ApprobationUploadValidationSchema = Joi.object({
    flag: Joi.number().required(),
    contents: Joi.string().required(),
    maquette: MaquetteUploadValidationSchema,
    owner: UserValidationSchema,
});

export class Approbation implements IApprobation {
    constructor(
        public flag: number,
        public contents: string,
        public maquette: IMaquette,
        public owner: IUser) {}

        static createApprobationUp(payload: IApprobation) {
            return new this(+1, payload.contents, payload.maquette, payload.owner);
        }

        static createApprobationDown(payload: IApprobation) {
            return new this(-1, payload.contents, payload.maquette, payload.owner);
        }
}

