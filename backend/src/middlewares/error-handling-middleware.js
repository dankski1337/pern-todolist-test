import { responseError } from "../error/response-error.js";

async function errorHandler(err, req, res, next) {
    // Default error
    let statusCode = 500;
    let message = "Internal Server Error";
    let success = false;
    let stack = err.stack;

    if (!err) {
        next();
    }

    // Custom error
    if (err instanceof responseError) {
        statusCode = err.code;
        message = err.message;
        success = err.success;
    }

    res.status(statusCode).json({
        success: success,
        message: message,
        stack: stack,
    }).end();

    next();
}

export default errorHandler;
