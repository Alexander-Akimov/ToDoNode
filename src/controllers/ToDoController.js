var express = require('express');
var guard = require('express-jwt-permissions')()


var api = express.Router();
api.post('/add', (req, res) => {

    console.log(req.body.message);
    res.status(200).json({ message: 'Channel saved successfully' })
});

api.get('/all', (req, res) => {

    var permisList = req.user.permissions;

    //show todo list of all users if permission role = admin
    //show todo list of current user if permission role isn't admin

    //console.log(req.body.message);
    res.status(200).json(permisList)
})

module.exports = api;