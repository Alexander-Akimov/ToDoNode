
var express = require('express');
const passport = require('passport');

let app = express();

require('./config/express')(app, passport);

//db connection config 
require("./config/mongodb")();

//passport config
require("./config/passport")(passport);

//routing
require('./config/routes')(app, passport);



app.listen(3000, function () {
    console.log("Сервер ожидает подключения...");
});