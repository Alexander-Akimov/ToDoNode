const Todo = require("../models/todo");

exports.create = async (todo) => {
    let doc = await Todo.create(todo);
    return doc;
};

exports.update = async (id, updatedTodoObj) => {
    let user = await Todo.findByIdAndUpdate(id, updatedTodoObj);
    return user;
};

var getCriteria = (columns, order) => {

    let colNum = 0;
    let sort = 1
    if (order.length > 0) {
        colNum = order[0].column;
        sort = order[0].dir == 'asc' ? 1 : -1;
    }

    if (columns.length >= colNum)
        return [columns[colNum].data, sort];

    return {};
};

exports.getAll = async (selectOpts, role) => {

    let sortCriteria = getCriteria(selectOpts.columns, selectOpts.order);

    let filter = role == 2 ? {} : { userId: req.user.id }; // role == 2 - admin, role == 1 - user

    let todoDocs = await Todo.find(filter)
        .sort([sortCriteria]).
        exec();

    return todoDocs;
};

exports.getById = async (id) => {
    let todo = await Todo.findById(id);
    return todo;
};