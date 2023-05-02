import { Router, Request, Response } from "express";
import { JWTRequest, authMiddleware, forbidAuthMiddleware } from "../middlewares/authMiddleware";
import maquettesRepo from "./Maquettes.Repo";
import { StatusCodes } from "http-status-codes";
import { upload } from "../services/Maquettes.Services";
import { IUser } from "../Users/User.Entity";
import { Maquettes } from "../dal/mongoose/Maquettes.Schema";
import MaquettesRepo from "./Maquettes.Repo";

export const maquettesRouter = Router();

maquettesRouter.get("/", (req: Request, res: Response)=> {
    return res.json("OK");
});

maquettesRouter.post(
    "/", 
    authMiddleware(),
    forbidAuthMiddleware(["admin", "manager"]), 
    async (req: JWTRequest, res: Response) => {
    
        // console.log(req);
        // console.log(req.body);
        // console.log(req.auth);
        try {
            await maquettesRepo.create([upload(req.body, req.auth as IUser)]);
        } catch(err) {
            res.status(StatusCodes.BAD_REQUEST).send(err);
        }

        res.send("OK");
});

maquettesRouter.get("/:maquette_name/is_valid", async function(req, res) {
    console.log(req.params.maquette_name);
    const maquette = await MaquettesRepo.getOne({name: req.params.maquette_name});

    if(!maquette) {
        res.sendStatus(StatusCodes.NOT_FOUND);
        return;
    }

    console.log(maquette);

    res.send("Ok");
});