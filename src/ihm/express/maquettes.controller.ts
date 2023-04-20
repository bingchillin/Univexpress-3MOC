import { Router, Request, Response } from "express";

export const maquettesRouter = Router();

maquettesRouter.get('/', (req: Request, res: Response)=> {
    return res.json("OK");
})