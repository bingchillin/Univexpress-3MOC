import { NextFunction, Response } from "express";
import { IUser, Role } from "../Users/User.Entity";
import {expressjwt as jwt, Request} from "express-jwt";
import config from "../services/config";
import MaquettesRepo from "../Maquettes/Maquettes.Repo";
import { StatusCodes } from "http-status-codes";

export type JWTRequest = Request;


export const allowAuthMiddleware = (allowedRoles: Role[]) => {
    return (req: JWTRequest, res: Response, next: NextFunction) => {
        console.log(req.auth);
        const currentRole: Role = req.auth?.role

        if(currentRole == "admin") {
            // an admin can do everything by default
            // to block an admin use forbidAuthMiddleWare
            next();
            return;
        }

        if (!allowedRoles.includes(currentRole)) {
            res.status(401).send({
                status: 401,
                message: "You cannot access this resource."
            })
        } else {
            next();
        }
    }
}

export const forbidAuthMiddleware = (forbidRoles: Role[]) => {
    return (req: JWTRequest, res: Response, next: NextFunction) => {

        const currentRole: Role = req.auth?.role;
        
        if(!currentRole) {
            res.status(401).send({
                status: 401,
                message: "Unknown auth status."
            });
            return;
        }

        if (forbidRoles.includes(currentRole)) {
            res.status(401).send({
                status: 401,
                message: "You cannot access this resource."
            });
            return;
        } 

        next();
    }
}

export const bannedAuthMiddleware = () => {
    return (req: JWTRequest, res: Response, next: NextFunction) => {

        const currentBan = req.auth?.isBanned;

        if (currentBan == true) {
            res.status(401).send({
                status: 401,
                message: "You cannot access this resource."
            });
            return;
        } 

        next();
    }
}

export const authMiddleware = () => {
    return jwt({
        secret: config.JWT_SECRET,
        algorithms: ["HS256"],
      });
}

/* Un artiste ne peut accéder qu'a ses maquettes */
export const canAccessMaquette = () => {
    return async (req: JWTRequest, res: Response, next: NextFunction) => {

        const currentRole: Role = req.auth?.role;
        const maquette = await MaquettesRepo.getOne({name: req.params.maquette_name});

        if(!maquette) {
            res.sendStatus(StatusCodes.NOT_FOUND);
            return;
        }
    
        if(!currentRole) {
            res.status(401).send({
                status: 401,
                message: "Unknown auth status."
            });
            return;
        }
        
        if (currentRole == "artist" && maquette.owner?.email != req.auth?.email) {
            res.status(401).send({
                status: 401,
                message: "This is not your maquette."
            });
            return;
        } 

        next();
    }
}