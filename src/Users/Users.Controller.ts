import { Router } from "express";
import { allowAuthMiddleware, authMiddleware } from "../middlewares/authMiddleware";
import UsersRepo from "./Users.Repo";
import { User } from "./User.Entity";
import { StatusCodes } from "http-status-codes";

export const usersController = Router();


usersController.post("/manager", 
    authMiddleware(), allowAuthMiddleware(["admin"]),
    (req, res) => {
        try {
            const created = UsersRepo.create([User.createAsManager(req.body)]);
        } catch(err) {
            res.status(StatusCodes.UNAUTHORIZED).send(err);
            return;
        }

        res.sendStatus(StatusCodes.CREATED);
    }
);