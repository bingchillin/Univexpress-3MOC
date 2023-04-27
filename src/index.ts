import * as dotenv from 'dotenv';
dotenv.config();

import UsersRepo from "./Users/Users.Repo";
import app, { createServer } from "./index.express";



// create root user if none exists
async function checkAdminExists () {
    const user = await UsersRepo.getOneByNickname({nickname: 'admin'}); 
    console.log(user);

    if (user === null) {
        UsersRepo.create([{
            nickname: process.env.API_USERNAME, 
            email: process.env.API_EMAIL ?? "admin@admin.org", 
            password: process.env.API_PASSWORD ?? "toto",
            registrationDate: Date.now(),
        }])
    }
    return user; 
};

checkAdminExists();

// start server
setTimeout(() => createServer(app, 3000), 0);
