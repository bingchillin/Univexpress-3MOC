import express from 'express';


export const app = express();

app.get('/', (req, res) => res.send("Hello world"));

export function createServer(app: express.Express, port: number) {
    return app.listen(port, () => console.log(
        "Serveur en marche sur port " + port));
}

// Permet de ne pas lancer ce script quand on execute jest
if (require.main === module) {
    setTimeout(() => createServer(app, 3000), 0);
    setTimeout(() => createServer(app, 4000), 0);
}