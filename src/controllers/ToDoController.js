var express = require('express');
var guard = require('express-jwt-permissions')()

var Todo = require("../models/todo");

var api = express.Router();
api.post('/add', (req, res) => {
    var todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        userId: req.user.id
    });
    // Todo.create()
    todo.save(err => {
        if (err) {
            res.status(500).json({ message: err });
        }
        else {
            res.status(200).json({ code: 1, message: "Todo saved successfully" });
        }
    });
});

api.put('/', (req, res) => {

    let id = req.body.id;
    let updatedTodoObj = {
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status
    };
    Todo.findByIdAndUpdate(id, updatedTodoObj, function (err, user) {
        if (err) {
            res.status(500).json({ message: err });
        }
        else {
            res.status(200).json({ code: 1, message: "Todo saved successfully" });
        }
    });
});
var getCriteria = (columns, order) => {

    var colNum = 0;
    var sort = 1
    if (order.length > 0) {
        colNum = order[0].column;
        sort = order[0].dir == 'asc'? 1 : -1;
    }

    if (columns.length >= colNum)
        return [columns[colNum].data, sort];

    return {};
};

api.get('/all', (req, res) => {

    /*let field = req.query.field;
    let order = req.query.order;*/

    let columns = req.query.columns;
    let order = req.query.order;

     var sortCriteria = getCriteria(columns, order);

    //var permisList = req.user.permissions;
    let role = req.user.role;

    var filter = role == 2 ? {} : { userId: req.user.id }; // role == 2 - admin, role == 1 - user

    Todo.find(filter)
        .sort([sortCriteria])
        .exec((err, todoDocs) => {
            if (err) {
                res.status(500).json({ message: err });
            }
            res.status(200).json({ data: todoDocs, recordsTotal: todoDocs.length });
        });
});

api.get('/:id', (req, res) => {
    let id = req.params.id;

    Todo.findById(id, (err, todo) => {
        if (err) {
            res.status(500).json({ message: err });
        }
        res.status(200).json(todo);
    });
});

module.exports = api;