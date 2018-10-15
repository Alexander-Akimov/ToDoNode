var passport = require('passport');
var User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;


module.exports = (app) => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    app.use(passport.initialize());
   // this.use(passport.session());
}