var express = require('express');

var account = require("../controllers/AuthController");
var todo = require("../controllers/ToDoController");
var authenticate = require('../middleware/authMiddleware').authenticate;

let router = express.Router();

var unauthorizedStupidHandling = function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ message: 'invalid token...' });
    }
};



router.use("/account", account);
router.use("/todo", authenticate, unauthorizedStupidHandling, todo);

router.use(function (err, req, res, next) {
    if (err.code === 'permission_denied') {
      res.status(403).json({ message: 'Forbidden' });
    }
  });

module.exports = router;