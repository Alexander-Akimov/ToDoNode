var passport = require("passport");
var User = require("../models/user");
var UserDataExt = require('../extensions/userData-ext');

exports.register = (req, res) => {
    UserDataExt.findUserByEmail(req.body.email, (err, userData) => {
        if (err) {
            res.status(409).json({ message: `An error occured: ${err.message}` });
        } else if (userData) {
            res.status(300).json({ message: `Email ${req.body.email} is already registered` });
        }
        else {
            User.register(new User({ username: req.body.email, role: req.body.role }), req.body.password, function (err, account) {
                if (err) {
                    res.status(500).json({ message: err });
                }
                passport.authenticate('local', { session: false })(req, res, () => {
                    res.status(200).json({ message: 'Successfully created new account' });
                });
            });
        }
    });
};

exports.login = (req, res, next) => {
    UserDataExt.findUserByEmail(req.body.email, (err, userData) => {
        if(userData == null) {
            res.status(401).json({ message: `Email or password invalid, please check your credentials` });
        }
        if (err) {
            res.status(409).json({ message: `An error occured: ${err.message}` });
        } else {
            next();
        }
    });
};