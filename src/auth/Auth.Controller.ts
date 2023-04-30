import {Router} from "express";
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
    const pl = req.body as IUserRegistrationDTO;
    const user = await usersCrud.getOne({email: pl.email});

    if(!user) {
        res.status(404).send("User not found");
        return;
    }

    if(pl.password != user.password) {
        res.status(StatusCodes.FORBIDDEN).send("Forbidden");
        return;
    }

    user.password = "*deleted*";  // evite que le mdp soit dans le jwt

    const token = jwt.sign(user, config.JWT_SECRET, { expiresIn: "1800s" });

    res.json(token);

    return;
});

authController.post("/register", async (req, res) => {
    let users: IUser[];
    try {
        const payload = req.body as IUserRegistrationDTO;
        console.log("pl %s", payload);
        users = await Users.create([
            User.fromUserLoginDto(payload)
        ]);
    } catch(err) {
        console.log("err %s", JSON.stringify(err));
        res.status(StatusCodes.BAD_REQUEST).send(err);
        return;
    }

    console.log("user: %s", users);

    const token = jwt.sign(users[0], config.JWT_SECRET, {expiresIn: "1800s"});
    
    res.json(token);

});

export default authController;