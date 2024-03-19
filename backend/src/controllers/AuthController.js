import { userService } from '../services/authService.js';

async function registerUser(req, res) {
    if (!req.body.name || !req.body.password) {
        res.status(400).send({
            message: "Username and password are required!"
        });
    }
    if(req.body.password.length < 8) {
        res.status(400).send({
            message: "Password must be at least 8 characters long"
        });
    }else{
        await userService.registerUser(req, res);
    }
}

// TODO: USE TRY CATCH BLOCKS TO HANDLE ERRORS

// TODO: Implement other functions such as login, logout, etc

export const AuthController = {
    registerUser,
}