import todoService from "../services/todoservice";

class TodoController {
    static async add(req, res, next) {
        let todo = {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            userId: req.user.id
        };

        try {
            let result = await todoService.create(todo);

            res.status(200).json({ code: 1, message: "Todo saved successfully" });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {

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
            next(err);
        }
    }

    static async getAll(req, res, next) {

        let role = req.user.role;

        let selectOpts = {
            columns: req.query.columns,
            order: req.query.order,
            id: req.user.id
        };

        try {
            let todoDocs = await todoService.getAll(selectOpts, role);

            res.status(200).json({ data: todoDocs, recordsTotal: todoDocs.length });

        } catch (err) {
            next(err);
        }
    }

    static async getById(req, res, next) {
        let id = req.params.id;
        try {
            let todo = await todoService.findById(id);

            res.status(200).json(todo);
        } catch (err) {
            next(err);
        }
    }
}

export default TodoController;