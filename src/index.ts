import app, { createServer } from "./index.express";


setTimeout(() => createServer(app, 3000), 0);
 