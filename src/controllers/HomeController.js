var express = require('express');

var homeController = {};

var route = express.Router();

homeController.get = ( req, res) => {
    // if (err.name === 'UnauthorizedError') {
    //     res.render("unauthorized.hbs");
    // }
    res.render("home.hbs");
};

route.get("/", homeController.get);

module.exports = route;