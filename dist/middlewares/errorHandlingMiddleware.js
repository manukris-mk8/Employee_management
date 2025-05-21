"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlineMiddleware = void 0;
const httpExceptions_1 = __importDefault(require("../exceptions/httpExceptions"));
const errorHandlineMiddleware = (error, req, res, next) => {
    try {
        if (error instanceof httpExceptions_1.default) {
            const status = error.status || 500;
            const message = error.message || "Something went wrong !";
            let responseBody = { message: message };
            res.status(status).json(responseBody);
        }
        else {
            console.error(error.stack);
            res.status(500).send({ error: error.message });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.errorHandlineMiddleware = errorHandlineMiddleware;
//# sourceMappingURL=errorHandlingMiddleware.js.map