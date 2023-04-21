import {describe, test, expect, beforeAll, afterAll} from "@jest/globals";
import mongoose, { mongoUrl } from "../../services/mongoose";
import { Maquettes } from "./maquettes";
import { exec } from "child_process";
import { Mongoose } from "mongoose";

/**
 * https://zellwk.com/blog/jest-and-mongoose/
 */

describe("dal mongoose maquette", ()=> {

    beforeAll(async () => {

        await mongoose.connect(mongoUrl);
        await Maquettes.deleteMany();
    }, 40000);
    
    afterAll((done) => {

        mongoose.connection.close();  
        done();
    });    

    test("mongoose est connecté", () => {
        expect(mongoose.connection).toBeTruthy();
    });

    test("repo est vide", async () => {
        const maquettes = await Maquettes.find();

        expect(maquettes).toHaveLength(0);
    });

    test("ajouter quelque chose", async () => {

        const maquette = new Maquettes({
            name: "toto",
            dateSubmit: Date.now(),
            url: "toto"
        });

        const doc = await maquette.save();

        expect(doc._id).toBeTruthy();
    });

    test("validation fonctionne", async () => {

        const maquette = new Maquettes({
            name: "toto",
        });

        const errors = maquette.validateSync();
        
        expect(errors).toBeTruthy();
    });

    test("Une maquette existe en base de données", async () => {
        const maquettes = await Maquettes.find();

        expect(maquettes).toHaveLength(1);
        expect(maquettes[0].name).toBe("toto");
        expect(maquettes[0].url).toBe("toto");
    });
});