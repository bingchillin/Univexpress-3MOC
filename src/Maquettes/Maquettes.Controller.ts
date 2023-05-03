import { Router, Request, Response } from "express";
import { JWTRequest, authMiddleware, canAccessMaquette, forbidAuthMiddleware } from "../middlewares/authMiddleware";
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

// return true si validé, false si non validé, null si tous les manager ont pas encore voté
maquettesRouter.get("/:maquette_name/is_valid", 
    authMiddleware(), 
    canAccessMaquette(),
    async function(req, res) {
    console.log(req.params.maquette_name);

    // console.log(maquette);

    res.send("Ok");
});

maquettesRouter.get("/:maquette_name/raw", 
    authMiddleware(), 
    canAccessMaquette(),
    async function(req: JWTRequest, res: Response) {

        const maquette = await MaquettesRepo.getOne({name: req.params.maquette_name});
        
        // console.log("maq name %s", req.params.maquette_name);

        if(!maquette) {
            res.sendStatus(StatusCodes.NOT_FOUND);
            return;
        }

        // console.log("maq %", JSON.stringify(maquette)); 

        const cont = Buffer.from(maquette.contents, 'base64').toString('ascii');
        res.writeHead(200, { 
            'Content-Type': 'image/jpeg' ,
            'Content-Length': cont.length,
        });
        res.write(cont);
        res.end();
            // res.header({'Content-Type': 'image/jpeg'}).send(
            
        // );
});