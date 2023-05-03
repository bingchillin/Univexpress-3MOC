import { Router, Request, Response } from "express";
import { JWTRequest, authMiddleware, forbidAuthMiddleware } from "../middlewares/authMiddleware";
import approbationRepo from "./Approbation.Repo";
import { StatusCodes } from "http-status-codes";
import { upload } from "../services/Maquette.Uploader";
import { IUser } from "../Users/User.Entity";
import { IMaquette } from "../Maquettes/Maquettes.Entity";
import app from "../index.express";
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
        /*
        try{
            let appro = await approbationRepo.getOne(req.body);
            try {
                if(appro){
                    try {
                        appro.flag = +1;
                        await approbationRepo.create([appro]);
                    } catch(err) {
                        res.status(StatusCodes.BAD_REQUEST).send(err);
                    }
                }else{
                    try{
                        await approbationRepo.update([req.body, {flag: +1}]);
                    }catch(err) {
                        res.status(StatusCodes.BAD_REQUEST).send(err);
                    }
                }
            }catch(err) {
                res.status(StatusCodes.BAD_REQUEST).send(err);
            }
        }catch(err) {
            res.status(StatusCodes.BAD_REQUEST).send(err);
        }*/


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

        /*
        try{
            let appro = await approbationRepo.getOne(req.body);
            try {
                if(appro){
                    try {
                        appro.flag = -1;
                        await approbationRepo.create([appro]);
                    } catch(err) {
                        res.status(StatusCodes.BAD_REQUEST).send(err);
                    }
                }else{
                    try{
                        await approbationRepo.update([req.body, {flag: -1}]);
                    }catch(err) {
                        res.status(StatusCodes.BAD_REQUEST).send(err);
                    }
                }
            }catch(err) {
                res.status(StatusCodes.BAD_REQUEST).send(err);
            }
        }catch(err) {
            res.status(StatusCodes.BAD_REQUEST).send(err);
        }
        */
        
});