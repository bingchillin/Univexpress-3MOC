import Joi from "joi";
import { IMaquette } from "../Maquettes/Maquettes.Entity";
import { IUser, UserValidationSchema } from "../Users/User.Entity";

type MaquetteVoteDto = Pick<IMaquette, "name">;

export interface IApprobation {
    isPositive: boolean;
    voter?: IUser;
    maquette?: MaquetteVoteDto;
    comment: string;
}

export const ApprobationValidationSchema = Joi.object({
    isPositive: Joi.boolean(),
    voter: UserValidationSchema.required(),
    maquette: Joi.object({
        name: Joi.string().required()
    }),
    comment: Joi.string().min(2),
}).options({allowUnknown: true});

export class Approbation implements IApprobation  {
    constructor(
        public isPositive: boolean, 
        public voter: IUser,
        public maquette: IMaquette,
        public comment: string) {}
}