import {Router} from "express";
import { UserLoginDto } from "./dto/UserLogin";
import usersCrud from "../Users/Users.Repo";
import { StatusCodes } from "http-status-codes";

import jwt from "jsonwebtoken";
import config from "../services/config";
import Users from "../Users/Users.Repo";
import { IUserRegistrationDTO, User, IUser } from "../Users/User.Entity";

const authController = Router();

authController.get("/login", (req, res) => {
    res.send("Ok");
});

authController.post("/login",async (req, res) => {
    const pl = req.body as UserLoginDto;
    const user = await usersCrud.getOne({email: pl.email});

    if(!user) {
        res.status(404).send("User not found");
        return;
    }

    if(pl.password != user.password) {
        res.status(StatusCodes.FORBIDDEN).send("Forbidden");
        return;
    }

    const token = jwt.sign(pl, config.JWT_SECRET, { expiresIn: "1800s" });

    res.json(token);

    return;
});

authController.post("/login",async (req, res) => {
    const pl = req.body as UserLoginDto;
    const user = await usersCrud.getOne({email: pl.email});

    if(!user) {
        res.status(404).send("User not found");
        return;
    }

    if(pl.password != user.password) {
        res.status(StatusCodes.FORBIDDEN).send("Forbidden");
        return;
    }

    const token = jwt.sign(pl, config.JWT_SECRET, { expiresIn: "1800s" });

    res.json(token);

    return;
});

authController.post("/register", async (req, res) => {
    try {
        const payload = req.body as IUserRegistrationDTO;
        console.log(payload);
        const num = await Users.create([
            User.fromUserLoginDto(payload)
        ]);
    } catch(err) {
        console.log(JSON.stringify(err));
        res.status(StatusCodes.BAD_REQUEST).send(err);
        return;
    }

    const token = jwt.sign(req.body, config.JWT_SECRET, {expiresIn: "1800s"});
    
    res.json(token);

    return;
});

export default authController;