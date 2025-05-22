"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const httpExceptions_1 = __importDefault(require("../exceptions/httpExceptions"));
const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        var _a;
        const role = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
        if (!allowedRoles.includes(role)) {
            throw new httpExceptions_1.default(401, "User has no previlage to access this resource");
        }
        next();
    };
};
exports.checkRole = checkRole;
//# sourceMappingURL=authorization.middleware.js.map