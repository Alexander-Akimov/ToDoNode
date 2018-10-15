var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

const TOKENTIME = 60 * 60 * 24 * 90;

const SECRET = "nodeJS ToDo Test";

let authenticate = expressJwt({ secret: SECRET });

//.unless({path:['/login','/', '/favicon.ico']});

let generateAccessToken = (req, res, next) => {
  req.token = req.token || {};
  req.token = jwt.sign({
    id: req.user.id,
    role: req.user.role,
    permissions: [
      {"user": "read"},
      {"user": "write"}
    ]
  }, SECRET, {
      expiresIn: TOKENTIME // 90 days
    });
  next();
}

let respond = (req, res) => {
 // res.header('Authorization', "Bearer " + req.token);
  //res.redirect('/home');

 res.status(200).json({
    user: req.user.username,
    token: req.token
  }); /**/
}

module.exports = {
  authenticate,
  generateAccessToken,
  respond
}
