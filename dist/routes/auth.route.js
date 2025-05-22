"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
const auth_controller_1 = require("../controllers/auth.controller");
const employee_route_1 = require("./employee.route");
exports.authRouter = express_1.default.Router();
const authService = new auth_service_1.default(employee_route_1.employeeService);
new auth_controller_1.AuthController(authService, exports.authRouter);
//# sourceMappingURL=auth.route.js.map