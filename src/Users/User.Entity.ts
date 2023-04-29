import Joi from "joi";

// https://stackoverflow.com/questions/44480644/string-union-to-string-array
const ROLES = ['admin', 'manager', 'artist', 'user'] as const;
export type Role = typeof ROLES[number];

export interface IUser {
    email: string;
    password?: string;
    registrationDate: number;
    nickname?: string;
    role: Role;
}

export type IUserRegistrationDTO = Required<Pick<IUser, 'email' | 'password'>>

export class User implements IUser {
    public registrationDate: number;
    
    constructor(public email: string, public password: string, public nickname?: string, public role: Role = "user") {
        this.registrationDate = Date.now();
    }

    static fromUserLoginDto(payload: IUserRegistrationDTO) {
        return new this(payload.email, payload.password);
    }
}

export const UserValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    nickname: Joi.string().alphanum(),
    password: Joi.string().required().min(8),
    registrationDate: Joi.number(),
    role: Joi.string().valid(...ROLES).required(),
});

export type UserByNicknameDTO = Pick<IUser, 'nickname'>;

