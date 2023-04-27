export interface IUser {
    email: string;
    password: string;
    registrationDate: number;
    nickname?: string;
}

export class User implements IUser {
    public registrationDate: number;
    
    constructor(public email: string, public password: string, public nickname: string) {
        this.registrationDate = Date.now();
    }
}

export type UserByNicknameDTO = Pick<IUser, 'nickname'>;