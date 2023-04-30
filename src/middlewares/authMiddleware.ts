import { NextFunction, Response } from "express";
import { Role } from "../Users/User.Entity";
import {expressjwt as jwt, Request} from "express-jwt";
import config from "../services/config";

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

export const authMiddleware = () => {
    return jwt({
        secret: config.JWT_SECRET,
        algorithms: ["HS256"],
      });
}

