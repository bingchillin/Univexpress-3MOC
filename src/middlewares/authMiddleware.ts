import { NextFunction, Response } from "express";
import { Role } from "../Users/User.Entity";
import {Request} from 'express-jwt'


export const allowAuthMiddleware = (allowedRoles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
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
    return (req: Request, res: Response, next: NextFunction) => {
        console.log(req.auth);

        const currentRole: Role = req.auth?.role

        if (forbidRoles.includes(currentRole)) {
            res.status(401).send({
                status: 401,
                message: "You cannot access this resource."
            })
        } else {
            next();
        }

    }
}