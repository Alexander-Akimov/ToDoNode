
const User = require("../models/user");

exports.getByEmail = async (email) => {

    let userData = await User.findOne({ 'username': email });

    return userData;
};

exports.register = async (user, pass) => {
    
    let account = User.register(new User(user), pass);

    return account;
};