import UsersRepo from "./Users/Users.Repo";
import app, { createServer } from "./index.express";


// create root user if none exists
const fun = async ()=>{
    const user = await UsersRepo.getOneByNickname({nickname: 'ADMIN'}); 
    console.log(user);
    return user;
};
fun();


// start server
setTimeout(() => createServer(app, 3000), 0);
