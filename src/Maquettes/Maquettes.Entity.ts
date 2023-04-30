import Joi from "joi";
import { IUser, UserValidationSchema } from "../Users/User.Entity";
import { Types } from "mongoose";

export interface IMaquette {
    name: string;
    contents: string;
    dateSubmit: Date;
    owner: IUser;
}

export interface MaquetteUploadDto {
    name: string;
    payload: string;
}

export const MaquetteUploadValidationSchema = Joi.object({
    name: Joi.string().required(),
    contents: Joi.string().required(),
    dateSubmit: Joi.date(),
    // owner: UserValidationSchema,
}).options({allowUnknown: true});

export class Maquette implements IMaquette {
    constructor(
        public name: string, 
        public contents: string,
        public dateSubmit: Date, 
        public owner: IUser) {}
}

// export class Maquette implements IMaquette {
//     name: string;
//     url: string;
//     dateSubmit: Date;
//     owner: number;
// }