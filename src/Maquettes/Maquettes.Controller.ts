import { Router, Request, Response } from "express";
import { JWTRequest, authMiddleware, canAccessMaquette, forbidAuthMiddleware, bannedAuthMiddleware } from "../middlewares/authMiddleware";
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
    bannedAuthMiddleware(),
    async (req: JWTRequest, res: Response) => {
    
        try {
            await maquettesRepo.create([upload(req.body, req.auth as IUser)]);
        } catch(err) {
            res.status(StatusCodes.BAD_REQUEST).send(err);
        }

        res.send("OK");
});

// return true si validé, false si non validé, null si tous les manager ont pas encore voté
maquettesRouter.get("/:maquette_name/is_valid", 
    authMiddleware(), 
    canAccessMaquette(),
    async function(req, res) {
        res.send("Ok");
    }
);

maquettesRouter.get("/:maquette_name/raw", 
    authMiddleware(), 
    canAccessMaquette(),
    async function(req: JWTRequest, res: Response) {

        const maquette = await MaquettesRepo.getOne({name: req.params.maquette_name});
        
        if(!maquette) {
            res.sendStatus(StatusCodes.NOT_FOUND);
            return;
        }

        const cont = Buffer.from(maquette.contents, "base64").toString("ascii");
        res.writeHead(200, { 
            "Content-Type": "image/jpeg" ,
            "Content-Length": cont.length,
        });
        res.write(cont);
        res.end();
    }
);

maquettesRouter.get("/:maquette_name", 
    authMiddleware(), 
    canAccessMaquette(),
    async function(req: JWTRequest, res: Response) {

        const maquette = await MaquettesRepo.getOne({name: req.params.maquette_name});
        
        if(!maquette) {
            res.sendStatus(StatusCodes.NOT_FOUND);
            return;
        }

        res.status(200).json(maquette);
    }
);