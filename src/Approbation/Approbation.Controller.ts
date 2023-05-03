import { Router, Request, Response } from "express";
import { JWTRequest, authMiddleware, forbidAuthMiddleware } from "../middlewares/authMiddleware";
import approbationRepo from "./Approbation.Repo";
import { StatusCodes } from "http-status-codes";
import { Approbation } from "./Approbation.Entity";

export const approbationRouter = Router();

approbationRouter.get("/", (req: Request, res: Response)=> {
    return res.json("OK");
});

approbationRouter.post(
    "/:id/upVote",
    authMiddleware(),
    forbidAuthMiddleware(["artist"]), 
    async (req: JWTRequest, res: Response) => {
    
        console.log(req);
        console.log(req.body);

        try{
            const appro = approbationRepo.create([Approbation.createApprobationUp(req.body)])
        }catch(err) {
            res.status(StatusCodes.BAD_REQUEST).send(err);
        }
});

approbationRouter.post(
    "/:id/downVote",
    authMiddleware(),
    forbidAuthMiddleware(["artist"]),  
    async (req: JWTRequest, res: Response) => {
    
        console.log(req);
        console.log(req.body);

        try{
            const appro = approbationRepo.create([Approbation.createApprobationDown(req.body)])
        }catch(err) {
            res.status(StatusCodes.BAD_REQUEST).send(err);
        }
        
});