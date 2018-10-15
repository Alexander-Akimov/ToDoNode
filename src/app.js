
var bodyParser = require('body-parser');
var express = require('express');
var routes = require('./routes');

let app = express();

app.use(bodyParser.json()); //{ limit: config.bodyLimit }

app.use(express.static(__dirname + "/../public"));

//db connection config 
require("./config/mongodb")();

//passport config
require("./config/passport")(app);

//routing
app.use("/api", routes);

app.listen(3000, function () {
    console.log("Сервер ожидает подключения...");
});