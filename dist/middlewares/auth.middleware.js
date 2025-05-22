"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const httpExceptions_1 = __importDefault(require("../exceptions/httpExceptions"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../utils/constants");
const getToken = (req) => {
    const token = req.headers.authorization;
    if (!token) {
        throw new httpExceptions_1.default(401, 'Not authorized');
    }
    const tokenSplits = token.split(' ');
    if (tokenSplits.length != 2) {
        throw new httpExceptions_1.default(401, "Invalid token");
    }
    return tokenSplits[1];
};
const authMiddleware = (req, res, next) => {
    const token = getToken(req);
    if (!token) {
        throw new httpExceptions_1.default(401, 'Not authorized');
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, constants_1.JWT_SECRET);
        req.user = payload;
        // console.log(payload);
    }
    catch (error) {
        throw new httpExceptions_1.default(401, "Invalid or expired token");
    }
    next();
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map