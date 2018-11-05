'use strict'

import userService from "../services/userService";

class AuthController {
    static async register(req, res, next) {
        try {
            let userData = await userService.getByEmail(req.body.email);
            if (userData) {
                res.status(300).json({ message: `Email ${req.body.email} is already registered` });
            }
            else {
                let account = await userService.register({ username: req.body.email, role: req.body.role }, req.body.password);
                next();
            }
        } catch (err) {
            next(err);
        }
    }

    static successRegistr(req, res) {
        res.status(200).json({ message: 'Successfully created new account' });
    }

    static async login(req, res, next) {
        try {
            let userData = await userService.getByEmail(req.body.email);
            if (userData == null) {
                res.status(401).json({ message: `Email or password invalid, please check your credentials` });
            }
            next();
        } catch (err) {
            next(err);
        }
    }

    static logout(req, res, next) {
        req.logout();
        //res.redirect('/');
        res.status(200).json({ message: 'Successful user logout' });
    }
}

export default AuthController;