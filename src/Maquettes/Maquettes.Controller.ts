import { Router, Request, Response } from "express";
import { forbidAuthMiddleware } from "../middlewares/authMiddleware";

export const maquettesRouter = Router();

maquettesRouter.get("/", (req: Request, res: Response)=> {
    return res.json("OK");
});

maquettesRouter.post(
    "/", 
    forbidAuthMiddleware(["admin", "manager", "user"]), 
    (req: Request, res: Response) => {
    return res.json("OK");
});