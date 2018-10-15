var express = require('express');

var account = require("../controllers/AuthController");
var todo = require("../controllers/ToDoController");
var home = require("../controllers/HomeController");
var authenticate = require('../middleware/authMiddleware').authenticate;

let router = express.Router();

var unauthorizedStupidHandling = function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'invalid token...' });
  }
};

//router
router.use("/home", home)

router.use("/api/account", account);
router.use("/api/todo", authenticate, unauthorizedStupidHandling, todo);

router.use(function (err, req, res, next) {
  if (err.code === 'permission_denied') {
    res.status(403).json({ message: 'Forbidden' });
  }
});

module.exports = router;