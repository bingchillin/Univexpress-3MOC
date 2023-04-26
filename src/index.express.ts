import express from "express";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSMongoose from "@adminjs/mongoose";
AdminJS.registerAdapter(AdminJSMongoose);
import mongoose, {mongoUrl} from "./services/mongoose";
import { Maquettes } from "./dal/mongoose/maquettes";
import { maquettesRouter } from "./Maquettes/Maquettes.Controller";
import {expressjwt as jwt, Request as JWTRequest} from "express-jwt";
import config from "./services/config";
import authController from "./auth/auth.controller";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

// app.use(
//   jwt({
//     secret: config.JWT_SECRET,
//     algorithms: ["HS256"],
//   }).unless({ path: [
//     "/auth/login",
//     "/auth/register",
//     "/",
//     "/admin",
//     "/admin/**"
//   ] })
// );

app.get("/", (req, res) => res.send("Hello world"));

const adminJs = new AdminJS({
    databases: [], // We don’t have any resources connected yet.
    resources: [
        {resource: Maquettes}
    ],
    rootPath: "/admin", // Path to the AdminJS dashboard.
});
// Build and use a router to handle AdminJS routes.
const router = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, router);

app.use("/maquettes", maquettesRouter);
app.use("/auth", authController);

app.get(
    "/protected",
    jwt({ secret: config.JWT_SECRET, algorithms: ["HS256"] }),
    function (req: JWTRequest, res) {
      if (!req.auth?.admin) return res.sendStatus(401);
      res.sendStatus(200);
    }
  );

export function createServer(app: express.Express, port: number) {
    (async () => await mongoose.connect(mongoUrl))();

    return app.listen(port, () => console.log(
        "Serveur en marche sur port " + port));
}


export default app;
