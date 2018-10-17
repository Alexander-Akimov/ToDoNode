
import { authenticate, generateAccessToken, respond, unAuthHandle } from "../middleware/authMiddleware";
import { assume404, errorHandle } from "../middleware/errorHandleMiddleware";

import account from "../controllers/AuthController";
import home from "../controllers/HomeController";
import todo from "../controllers/ToDoController";

export default (app, passport) => {

  app.get("/home", home.get);

  app.post("/api/account/register", account.register,
    passport.authenticate('local', { session: false }), account.successRegistr);

  app.post("/api/account/login", account.login,
    passport.authenticate('local', { session: false, scope: [], failWithError: false }),
    unAuthHandle, generateAccessToken, respond);

  app.post("/api/todo/add", authenticate, unAuthHandle, todo.add);
  app.put("/api/todo/", authenticate, unAuthHandle, todo.update);
  app.get("/api/todo/all", authenticate, unAuthHandle, todo.getAll);
  app.get("/api/todo/:id", authenticate, unAuthHandle, todo.getById);

  // Error handling
  app.use(errorHandle);

  // assume 404 since no middleware responded
  app.use(assume404);
};