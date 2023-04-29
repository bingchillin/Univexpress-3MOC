export interface IMaquette {
    name: string;
    url: string;
    dateSubmit: Date;
    owner: number;
}

export interface MaquetteUploadDto {
    name: string;
    payload: string;
    owner: number;
}

// export class Maquette implements IMaquette {
//     name: string;
//     url: string;
//     dateSubmit: Date;
//     owner: number;
// }