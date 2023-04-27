export interface IUser {
    email: string;
    password: string;
    registrationDate: number;
    nickname?: string;
}

export type UserByNicknameDTO = Pick<IUser, 'nickname'>;