const express = require('express');
var hbs = require("hbs");
var bodyParser = require('body-parser');

module.exports = function (app, passport) {

    app.set("view engine", "hbs");

    app.use(bodyParser.json()); //{ limit: config.bodyLimit }

    app.use(express.static(__dirname + "/../public"));
    app.set('views', __dirname + '/views')
    hbs.registerPartials(__dirname + "/views/partials");

    app.use(passport.initialize());
    // app.use(passport.session());
};