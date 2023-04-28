import * as dotenv from 'dotenv';
dotenv.config();

import UsersRepo from "./Users/Users.Repo";
import app, { createServer } from "./index.express";
import { User } from './Users/User.Entity';



// create root user if none exists
async function checkAdminExists () {
    const user = await UsersRepo.getOneByNickname({nickname: 'admin'}); 

    if (user === null) {
        UsersRepo.create([new User(
            process.env.API_EMAIL ?? "admin@admin.org", 
            process.env.API_PASSWORD ?? "admin",
            process.env.API_USERNAME ?? "admin", 
            'admin'
        )])
    }
    return user; 
};

checkAdminExists();

// start server
setTimeout(() => createServer(app, 3000), 0);
