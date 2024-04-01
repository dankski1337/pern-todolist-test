import { todoListService } from "../services/todo-services.js";
import { responseError } from "../error/response-error.js";

async function createTodo(req, res, next) {
    try {
        const id_user = req.decoded.id_user;
        const title = req.body.title;
        const description = req.body.description;
        if (!id_user || !title || !description) {
            console.log(err.stack);
            throw new responseError("Invalid input", 400, false);
        }
        await todoListService.createTodo(id_user, title, description);
        res.status(201).json({
            success: true,
            message: "Todo created successfully",
            data: {
                id_user: id_user,
                title: title,
                description: description
            }
        });
    } catch (err) {
        console.log(err.stack);
        next(err);
    }
}

async function getTodos(req, res, next) {
    try {
        const id_user = req.decoded.id_user;
        if (!id_user) {
            throw new responseError("Invalid input", 400, false);
        }

        const results = await todoListService.getTodos(id_user);
        res.status(200).json({
            success: true,
            message: "Todo retrieved successfully",
            data: results.rows
        });
    } catch (err) {
        next(err);
    }
}

async function getTodo(req, res, next) {
    try {
        const id_user = req.decoded.id_user;
        const id_todo = req.params.id_todo;
        if (!id_user || !id_todo) {
            throw new responseError("Invalid input", 400, false);
        }

        const result = await todoListService.getTodo(id_user, id_todo);
        res.status(200).json({
            success: true,
            message: "Todo retrieved successfully",
            data: result.rows
        });
    } catch (err) {
        next(err);
    }
}

export const todoListController = {
    createTodo,
    getTodos,
    getTodo
};
