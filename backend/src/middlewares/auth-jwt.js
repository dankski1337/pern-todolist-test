import jwt from 'jsonwebtoken';
import { responseError } from '../error/response-error.js';

const verifyToken = (req, res, next) => {
    // check request header for token
    let token = req.headers["authorization"];

    // if token is not found, return 403 Forbidden
    if (!token) {
        throw new responseError("No token provided", 403, false);
    }
    // if token format is invalid, return 400 Bad Request
    if (token.split(" ")[0] !== "Bearer" || token.split(" ").length !== 2) {
        throw new responseError("Invalid token format", 400, false);
    }

    // Remove Bearer from string and take only the token
    token = token.split(" ")[1];

    // verify token then pass decoded token to next middleware
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            throw new responseError("Unauthorized", 401, false); // Unauthorized
        } else {
            req.decoded = decoded;
            next();
        }
    });
};

export default verifyToken;
