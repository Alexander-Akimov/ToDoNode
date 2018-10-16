const userService = require("../services/userService");

exports.register = async (req, res, next) => {
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
        res.status(500).json({ message: `An error occured: ${err.message}` });
        //res.status(500).json({ message: err });
    }
};

exports.successRegistr = (req, res) => {
    res.status(200).json({ message: 'Successfully created new account' });
};

exports.login = async (req, res, next) => {
    try {
        let userData = await userService.getByEmail(req.body.email);
        if (userData == null) {
            res.status(401).json({ message: `Email or password invalid, please check your credentials` });
        }
        next();
    } catch (err) {
        res.status(409).json({ message: `An error occured: ${err.message}` });
    }
};