class ConfigService {
    JWT_SECRET: string;


    MONGO_DB: string;
    MONGO_USER: string;
    MONGO_PASSWORD: string;
    MONGO_HOST: string;
    MONGO_PORT: string;

    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET ?? "secret";

        this.MONGO_DB = process.env.MONGO_DB ?? "maquettes";
        this.MONGO_HOST = process.env.MONGO_HOST ?? "localhost";
        this.MONGO_PORT = process.env.MONGO_PORT ?? "27017";
        this.MONGO_USER = process.env.MONFO_SER ?? "admin";
        this.MONGO_PASSWORD = process.env.MONG_PASSWORD ?? "admin";
    }
}

export default new ConfigService(); 