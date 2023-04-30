import { Router, Request, Response } from "express";
import { JWTRequest, authMiddleware, forbidAuthMiddleware } from "../middlewares/authMiddleware";
import maquettesRepo from "./Maquettes.Repo";
import { StatusCodes } from "http-status-codes";
import { upload } from "../services/Maquette.Uploader";
import { IUser } from "../Users/User.Entity";

export const maquettesRouter = Router();

maquettesRouter.get("/", (req: Request, res: Response)=> {
    return res.json("OK");
});

maquettesRouter.post(
    "/", 
    authMiddleware(),
    forbidAuthMiddleware(["admin", "manager"]), 
    async (req: JWTRequest, res: Response) => {
    
        console.log(req);
        console.log(req.body);
        try {
            await maquettesRepo.create([upload(req.body, req.auth as IUser)]);
        } catch(err) {
            res.status(StatusCodes.BAD_REQUEST).send(err);
        }
});