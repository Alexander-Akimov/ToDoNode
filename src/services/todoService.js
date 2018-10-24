import Todo from "../models/todo";

class TodoService {
    static async create(todo) {
        let doc = await Todo.create(todo);
        return doc;
    }

    static async update(id, updatedTodoObj) {
        let user = await Todo.findByIdAndUpdate(id, updatedTodoObj);
        return user;
    }

    static getCriteria(columns, order) {

        let colNum = 0;
        let sort = 1
        if (order.length > 0) {
            colNum = order[0].column;
            sort = order[0].dir == 'asc' ? 1 : -1;
        }

        if (columns.length >= colNum)
            return [columns[colNum].data, sort];

        return {};
    }

    static async getAll(selectOpts, role) {

        let sortCriteria = TodoService.getCriteria(selectOpts.columns, selectOpts.order);
        let filter = role == 2 ? {} : { userId: selectOpts.id }; // role == 2 - admin, role == 1 - user

        var todoDocs = [];

        todoDocs = await Todo.find(filter)
            .sort([sortCriteria])
            .exec();

        return todoDocs;

    }

    static async getById(id) {
        let todo = await Todo.findById(id);
        return todo;
    }

    static async deleteById(id) {
        let result = await Todo.deleteOne({ _id: id });
        return result;
    }
}

export default TodoService;