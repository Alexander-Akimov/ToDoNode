
var account = require("../controllers/AuthController");
var todo = require("../controllers/ToDoController");
var home = require("../controllers/HomeController");
var { generateAccessToken, authenticate, respond, unAuthHandle } = require('../middleware/authMiddleware');

module.exports = function (app, passport) {

  app.get("/home", home.get);

  app.post("/api/account/register", account.register);
  app.post("/api/account/login", account.login,
    passport.authenticate('local', { session: false, scope: [], failWithError: false }),
    unAuthHandle, generateAccessToken, respond); 

  app.post("/api/todo/add", authenticate, unAuthHandle, todo.add);
  app.put("/api/todo/", authenticate, unAuthHandle, todo.update);
  app.get("/api/todo/all", authenticate, unAuthHandle, todo.getAll);
  app.get("/api/todo/:id", authenticate, unAuthHandle, todo.getById);
};