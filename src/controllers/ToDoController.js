const todoService = require("../services/todoservice");

exports.add = async (req, res) => {
    let todo = {
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        userId: req.user.id
    };
    
    try {
        var let = await todoService.create(todo);

        res.status(200).json({ code: 1, message: "Todo saved successfully" });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.update = async (req, res) => {

    let id = req.body.id;
    let updatedTodoObj = {
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status
    };

    try {
        let user = await todoService.update(id, updatedTodoObj);

        res.status(200).json({ code: 1, message: "Todo saved successfully" });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getAll = async (req, res) => {

    let role = req.user.role;

    let selectOpts = {
        columns: req.query.columns,
        order: req.query.order
    };

    try {
        let todoDocs = await todoService.getAll(selectOpts, role);      

        res.status(200).json({ data: todoDocs, recordsTotal: todoDocs.length });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    let id = req.params.id;
    try {
        let todo = await todoService.findById(id);

        res.status(200).json(todo);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};