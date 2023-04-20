import {describe, test, expect, beforeAll, afterAll} from "@jest/globals";
import mongoose, { mongoUrl } from "../../services/mongoose";
import { Maquettes } from "./maquette";
import { exec } from "child_process";

/**
 * https://zellwk.com/blog/jest-and-mongoose/
 */

describe("dal mongoose maquette", ()=> {
    beforeAll(async () => {
        console.log(mongoUrl);
        exec("docker compose up -d", (error, stdout, stderr)=> {
            console.log("toto");
            if(error) {
                console.error(error);
            }
            if(stderr) {
                console.error(stderr);
            }
    
            console.log(stdout);
        });
        console.log("tata");
        await mongoose.connect(mongoUrl);
        await Maquettes.deleteMany();
    }, 40000)
    
    afterAll(async () => {
        // await mongoose.connection.close();
        exec("docker compose down");
    
    })    

    test("mongoose est connecté", () => {
        expect(mongoose.connection).toBeTruthy();
    });

    test("repo est vide", async () => {
        const maquettes = await Maquettes.find();
        console.log(maquettes);
        expect(maquettes).toHaveLength(0);
    })
});