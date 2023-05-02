import { Response, Router } from "express";
import { JWTRequest, allowAuthMiddleware, authMiddleware } from "../middlewares/authMiddleware";
import { StatusCodes } from "http-status-codes";
import ApprobationRepo from "./Approbation.Repo";
import { makeApprobation } from "../services/Approbations.Services";
import { IUser } from "../Users/User.Entity";

export const approbationController = Router();

approbationController.post("/", 
    authMiddleware(), allowAuthMiddleware(["manager"]),
    async (req: JWTRequest, res: Response) => {

        try {
            await ApprobationRepo.create([makeApprobation(req.body, req.auth as IUser)]);
        } catch(err) {
            res.status(StatusCodes.BAD_REQUEST).send(err);
        }
        res.send("OK");
    }
);
