import app, { createServer } from "./index.controller";


setTimeout(() => createServer(app, 3000), 0);
 