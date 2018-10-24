import bodyParser from 'body-parser';
import express from 'express';
import hbs from "hbs";


export default  (app, passport) => {

    app.set("view engine", "hbs");

    app.use(bodyParser.json()); //{ limit: config.bodyLimit }

    app.use(express.static(__dirname + "/../../public"));
    app.set('views', __dirname + '/../views')
    hbs.registerPartials(__dirname + "/../views/partials");

    app.use(passport.initialize());
    // app.use(passport.session());
}