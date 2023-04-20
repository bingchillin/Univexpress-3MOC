"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConfigService {
    JWT_SECRET;
    MONGO_DB;
    MONGO_USER;
    MONGO_PASSWORD;
    MONGO_HOST;
    MONGO_PORT;
    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET ?? "secret";
        this.MONGO_DB = process.env.MONGO_DB ?? "maquettes";
        this.MONGO_HOST = process.env.MONGO_HOST ?? "localhost";
        this.MONGO_PORT = process.env.MONGO_PORT ?? "27017";
        this.MONGO_USER = process.env.MONFO_SER ?? "admin";
        this.MONGO_PASSWORD = process.env.MONG_PASSWORD ?? "admin";
    }
}
exports.default = new ConfigService();
