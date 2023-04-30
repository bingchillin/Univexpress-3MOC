import { IMaquette, Maquette, MaquetteUploadDto } from "../Maquettes/Maquettes.Entity";
import { IUser } from "../Users/User.Entity";
import { asUserPojo, userSchema, Users } from "../dal/mongoose/Users.Schema";

export function upload(payload: MaquetteUploadDto, user: IUser): IMaquette {
    const maquette = new Maquette(
        payload.name, 
        payload.payload, 
        new Date(), 
        user
    );

    return maquette;
}