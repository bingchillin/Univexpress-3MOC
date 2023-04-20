"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const adminjs_1 = __importDefault(require("adminjs"));
const express_2 = __importDefault(require("@adminjs/express"));
const mongoose_1 = __importDefault(require("@adminjs/mongoose"));
adminjs_1.default.registerAdapter(mongoose_1.default);
const mongoose_2 = __importStar(require("../../services/mongoose"));
const maquette_1 = require("../../dal/mongoose/maquette");
const maquettes_controller_1 = require("./maquettes.controller");
const app = (0, express_1.default)();
app.get('/', (req, res) => res.send("Hello world"));
const adminJs = new adminjs_1.default({
    databases: [],
    resources: [
        { resource: maquette_1.Maquettes }
    ],
    rootPath: '/admin', // Path to the AdminJS dashboard.
});
// Build and use a router to handle AdminJS routes.
const router = express_2.default.buildRouter(adminJs);
app.use(adminJs.options.rootPath, router);
app.use('/maquettes', maquettes_controller_1.maquettesRouter);
function createServer(app, port) {
    (async () => await mongoose_2.default.connect(mongoose_2.mongoUrl))();
    return app.listen(port, () => console.log("Serveur en marche sur port " + port));
}
exports.createServer = createServer;
exports.default = app;
