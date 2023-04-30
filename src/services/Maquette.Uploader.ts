import { IMaquette, Maquette, MaquetteUploadDto } from "../Maquettes/Maquettes.Entity";
import { IUser } from "../Users/User.Entity";
import UsersRepo from "../Users/Users.Repo";
import { Maquettes, MongooseMaquette } from "../dal/mongoose/Maquettes.Schema";
import { Users } from "../dal/mongoose/Users.Schema";

export function upload(payload: MaquetteUploadDto, user: IUser): IMaquette {
    const maquette = new Maquette(
        payload.name, 
        payload.payload, 
        new Date(), 
        user,
    );

    return maquette;
}
