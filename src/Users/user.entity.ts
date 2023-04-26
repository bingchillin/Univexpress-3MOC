export interface IUser {
    email: string;
    password: string;
    registrationDate: Date;
    nickname?: string;
}

export type UserByNicknameDTO = Pick<IUser, 'nickname'>;