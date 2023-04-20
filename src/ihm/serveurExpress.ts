import express from 'express';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSMongoose from '@adminjs/mongoose';
AdminJS.registerAdapter(AdminJSMongoose);
import mongoose, {mongoUrl} from "../services/mongoose";


const app = express();

app.get('/', (req, res) => res.send("Hello world"));

import {maquetteSchema} from "../Maquettes/maquette.entity";

const Maquettes = mongoose.model('Maquettes', maquetteSchema);

const adminJs = new AdminJS({
    databases: [], // We don’t have any resources connected yet.
    resources: [
        {resource: Maquettes}
    ],
    rootPath: '/admin', // Path to the AdminJS dashboard.
});
// Build and use a router to handle AdminJS routes.
const router = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, router);

function createServer(app: express.Express, port: number) {
    async () => await mongoose.connect(mongoUrl);

    return app.listen(port, () => console.log(
        "Serveur en marche sur port " + port));
}


export default app;