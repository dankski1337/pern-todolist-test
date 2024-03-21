import { responseError } from "../error/responseError.js";

async function errorHandler(err, req, res, next) {
    // Default error
    let statusCode = 500;
    let message = "Internal Server Error";

    if (!err) {
        next();
    }

    // Custom error
    if (err instanceof responseError) {
        statusCode = err.code;
        message = err.message;
    }

    res
        .status(statusCode)
        .json({
        message: message,
        })
        .end();

    next();
}

export default errorHandler;
