import Express from 'express';
import { todoListController } from "../controllers/todo-list-controllers.js";

const router = Express.Router();

router.post('/create-todo', async (req, res, next) => {
    await todoListController.createTodo(req, res, next);
});

router.get('/get-todos', async (req, res, next) => {
    await todoListController.getTodos(req, res, next);
});

router.get('/get-todo/:id_todo', async (req, res, next) => {
    await todoListController.getTodo(req, res, next);
});

export default router;
