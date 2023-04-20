export default interface Crud<T> {
    getAll(): Promise<T[]>;
    getOne({criteres}: {[key: string]: string}): Promise<T | null>;
    update([{criteres}, {changements}]: [{[key: string]: string}, {[key: string]: string}]): Promise<number>;
    create([objet]: T[]): Promise<number>;
    delete([{criteres}]: [{[key: string]: string}]): Promise<number>;
}
