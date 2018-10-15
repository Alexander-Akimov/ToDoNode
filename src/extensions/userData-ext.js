var mongoose  = require('mongoose');
var UserData = require("../models/user");

class UserDataExt {

  static findUserByEmail(email, callback) {
    UserData.findOne({ 'username': email }, (err, userData) => {
      if (err) {
        return callback(err, null);
      } else{
        return callback(null, userData);
      }
    });
  }
};

module.exports = UserDataExt;