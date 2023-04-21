import app, { createServer } from "./ihm/express/index.controller";


setTimeout(() => createServer(app, 3000), 0);
 