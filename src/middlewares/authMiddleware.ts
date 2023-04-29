import { NextFunction, Response } from "express";
import { Role } from "../Users/User.Entity";
import {expressjwt as jwt, Request as JWTRequest} from "express-jwt";
import config from "../services/config";


export const allowAuthMiddleware = (allowedRoles: Role[]) => {
    return (req: JWTRequest, res: Response, next: NextFunction) => {
        console.log(req.auth);
        const currentRole: Role = req.auth?.role

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
        // console.log(req);
        console.log(req.auth);
        console.log(req.auth?.role);

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