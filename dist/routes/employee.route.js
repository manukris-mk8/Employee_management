"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeService = void 0;
const express_1 = __importDefault(require("express"));
const employee_repository_1 = __importDefault(require("../repositories/employee.repository"));
const data_source_1 = __importDefault(require("../db/data-source"));
const employee_entity_1 = __importDefault(require("../entities/employee.entity"));
const employee_service_1 = __importDefault(require("../services/employee.service"));
const employee_controller_1 = __importDefault(require("../controllers/employee.controller"));
const department_service_1 = __importDefault(require("../services/department.service"));
const department_repository_1 = __importDefault(require("../repositories/department.repository"));
const department_entity_1 = __importDefault(require("../entities/department.entity"));
const employeeRouter = express_1.default.Router();
const departmentRepository = new department_repository_1.default(data_source_1.default.getRepository(department_entity_1.default));
const departmentService = new department_service_1.default(departmentRepository);
const employeeRepository = new employee_repository_1.default(data_source_1.default.getRepository(employee_entity_1.default));
const employeeService = new employee_service_1.default(employeeRepository, departmentService);
exports.employeeService = employeeService;
const employeeController = new employee_controller_1.default(employeeService, employeeRouter);
exports.default = employeeRouter;
// employeeRouter.get("/", employeeController.getAllEmployees);
// employeeRouter.get("/:id", employeeController.getEmployeeById);
//# sourceMappingURL=employee.route.js.map