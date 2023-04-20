import app from "./ihm/serveurExpress";


setTimeout((app) => app.listen(3000, () => console.log("Serveur en ecoute su rle port 3000")), 0);
