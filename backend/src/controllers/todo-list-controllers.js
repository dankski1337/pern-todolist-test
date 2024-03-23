import { todoListService } from "../services/todo-services.js";
import { responseError } from "../error/response-error.js";

async function createTodo(req, res, next){
    try {
        req.body.id_user = req.decoded.id_user;
        if (!req.body.id_user || !req.body.title || !req.body.description) {
            console.log(err.stack);
            throw new responseError("Invalid input", 400, false);
        }
        await todoListService.createTodo(req);
        res.status(201).json({
            success: true,
            message: "Todo created successfully",
            data: {
                id_user: req.body.id_user,
                title: req.body.title,
                description: req.body.description
            }
        });
    } catch (err) {
        console.log(err.stack);
        next(err);
    }
}

async function getTodos (req, res, next) {
    try{
        req.body.id_user = req.decoded.id_user;
        if(!req.body.id_user){
            throw new responseError("Invalid input", 400, false);
        }

        const results = await todoListService.getTodos(req);
        res.status(200).json({
            success: true,
            message: "Todo retrieved successfully",
            data: results.rows
        });
    }catch(err){
        next(err);
    }
}

async function getTodo (req, res, next) {
    try{
        req.body.id_user = req.decoded.id_user;
        if(!req.body.id_user || !req.params.id_todo){
            throw new responseError("Invalid input", 400, false);
        }

        const result = await todoListService.getTodo(req);
        res.status(200).json({
            success: true,
            message: "Todo retrieved successfully",
            data: result.rows
        });
    }catch(err){
        next(err);
    }
}

export const todoListController = {
    createTodo,
    getTodos,
    getTodo
}