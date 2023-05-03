import Joi from "joi";

// https://stackoverflow.com/questions/44480644/string-union-to-string-array
const ROLES = ["admin", "manager", "artist"] as const;
export type Role = typeof ROLES[number];

export interface IUser {
    email: string;
    password: string;
    registrationDate: Date;
    nickname?: string;
    role: Role;
    isBanned: boolean;
}

export type IUserRegistrationDTO = Pick<IUser, "email" | "password" | "nickname">;

export class User implements IUser {
    public registrationDate: Date;
    
    constructor(
        public email: string, 
        public password: string, 
        public nickname?: string, 
        public role: Role = "artist",
        public isBanned: boolean = false) {

        this.registrationDate = new Date();
    }

    static fromUserLoginDto(payload: IUserRegistrationDTO) {
        return new this(payload.email, payload.password, payload.nickname);
    }

    static createAsManager(payload: IUserRegistrationDTO) {
        return new this(payload.email, payload.password, undefined, "manager");
    }

    static createAsArtist(payload: IUserRegistrationDTO) {
        return new this(payload.email, payload.password, undefined, "artist");
    }
}

export const UserValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    nickname: Joi.string().alphanum(),
    password: Joi.string().required().min(8),
    registrationDate: Joi.date(),
    role: Joi.string().valid(...ROLES).required(),
    isBanned: Joi.boolean()
}).options({allowUnknown: true});

export type UserByNicknameDTO = Pick<IUser, "nickname">;

