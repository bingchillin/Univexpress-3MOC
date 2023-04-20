import {describe, test, expect, beforeAll, afterAll} from "@jest/globals";
import mongoose, { mongoUrl } from "../../services/mongoose";
import { Maquettes } from "./maquette";

/**
 * https://zellwk.com/blog/jest-and-mongoose/
 */

beforeAll(async () => {
    console.log(mongoUrl);
    await mongoose.connect(mongoUrl);
    await Maquettes.deleteMany();
})

afterAll(async () => {
    // await mongoose.connection.close();
})

describe("dal mongoose maquette", ()=> {
    test("mongoose est connecté", () => {
        expect(mongoose.connection).toBeTruthy();
    });

    test("repo est vide", async () => {
        const maquettes = await Maquettes.find();
        console.log(maquettes);
        expect(maquettes).toHaveLength(0);
    })
});