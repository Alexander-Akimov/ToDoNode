import configExpress from './config/express';
import configMongoDB from "./config/mongodb";
import configPassport from "./config/passport";
import configRouting from "./config/routes";
import express from 'express';
import passport from 'passport';

const app = express();

configExpress(app, passport);

//db connection config 
configMongoDB();

//passport config
configPassport(passport);

//routing
configRouting(app, passport);

app.listen(3000, function () {
    console.log("Сервер ожидает подключения...");
});