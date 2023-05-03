import { Response, Router } from "express";
import { JWTRequest, allowAuthMiddleware, authMiddleware } from "../middlewares/authMiddleware";
import { UsersRepository } from "../dal/mongoose/Users.Schema";
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

usersController.delete(
    "/:user_email", 
    authMiddleware(), allowAuthMiddleware(["admin"]),
    async (req: JWTRequest, res: Response) => {
        const user = await UsersRepo.getOne({email: req.params.user_email});

        if(!user) {
            res.sendStatus(StatusCodes.NOT_FOUND);
            return;
        }

        await UsersRepo.delete([{email: req.params.user_email}]);

        res.sendStatus(StatusCodes.NO_CONTENT);
    })