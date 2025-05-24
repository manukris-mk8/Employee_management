"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpExceptions_1 = __importDefault(require("../exceptions/httpExceptions"));
const create_employee_dto_1 = require("../dto/create-employee.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const authorization_middleware_1 = require("../middlewares/authorization.middleware");
const employee_entity_1 = require("../entities/employee.entity");
const update_employee_dto_1 = require("../dto/update-employee.dto");
const logger_service_1 = require("../services/logger.service");
const winston_1 = require("winston");
class EmployeeController {
    constructor(employeeService, router) {
        this.employeeService = employeeService;
        this.logger = logger_service_1.LoggerService.getInstance('EmployeeController');
        router.post("/", (0, authorization_middleware_1.checkRole)([employee_entity_1.EmployeeRole.HR, employee_entity_1.EmployeeRole.UX]), this.createEmployee.bind(this));
        router.get("/", this.getAllEmployees.bind(this));
        router.get("/:id", this.getEmployeeById.bind(this));
        router.put("/:id", (0, authorization_middleware_1.checkRole)([employee_entity_1.EmployeeRole.HR, employee_entity_1.EmployeeRole.UX]), this.updateEmployee.bind(this));
        router.delete("/:id", (0, authorization_middleware_1.checkRole)([employee_entity_1.EmployeeRole.HR]), this.removeEmployee.bind(this));
    }
    createEmployee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createEmployeeDto = (0, class_transformer_1.plainToInstance)(create_employee_dto_1.CreateEmployeeDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createEmployeeDto);
                if (errors.length > 0) {
                    this.logger.error(winston_1.error);
                    throw new httpExceptions_1.default(400, JSON.stringify(errors));
                }
                const savedEmployee = yield this.employeeService.createEmployee(createEmployeeDto);
                this.logger.info("Employee created successfully");
                res.status(201).send(savedEmployee);
            }
            catch (error) {
                this.logger.error("employee creation failed" + error);
                next(error);
            }
        });
    }
    getAllEmployees(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield this.employeeService.getAllEmployees();
                this.logger.info("Employee retrieved successfully");
                res.status(200).send(employees);
            }
            catch (error) {
                this.logger.error("employee retrieval failed" + error);
                next(error);
            }
        });
    }
    getEmployeeById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (isNaN(id)) {
                    this.logger.error('invalid employee id');
                    throw new httpExceptions_1.default(400, "Invalid employee ID");
                }
                const employee = yield this.employeeService.getEmployeeById(id);
                if (!employee) {
                    this.logger.error('employee does not exist');
                    throw new httpExceptions_1.default(404, "employee not found");
                }
                res.status(200).send(employee);
            }
            catch (error) {
                this.logger.error(error);
                next(error);
            }
        });
    }
    updateEmployee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (isNaN(id)) {
                    this.logger.error('invalid employee id');
                    throw new httpExceptions_1.default(400, "Invalid employee ID");
                }
                const employeeDto = (0, class_transformer_1.plainToInstance)(update_employee_dto_1.UpdateEmployeeDto, req.body);
                const errors = yield (0, class_validator_1.validate)(employeeDto);
                if (errors.length > 0) {
                    this.logger.error(JSON.stringify(errors));
                    throw new httpExceptions_1.default(400, JSON.stringify(errors));
                }
                yield this.employeeService.updateEmployeeById(id, employeeDto);
                res.status(200).send({ message: "Employee updated successfully" });
            }
            catch (error) {
                this.logger.error("employee updation failed" + error);
                next(error);
            }
        });
    }
    // async deleteEmployee(req: Request, res: Response) {
    //     const id = Number(req.params.id);
    //     await this.employeeService.deleteEmployeeById(id);
    //     res.status(200).send();
    // }
    removeEmployee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (isNaN(id)) {
                    this.logger.error('invalid employee id');
                    throw new httpExceptions_1.default(400, "Invalid employee ID");
                }
                yield this.employeeService.removeEmployeeById(id);
                res.status(200).send({ message: "Employee deleted successfully" });
            }
            catch (error) {
                this.logger.error("employee deletion failed" + error);
                next(error);
            }
        });
    }
}
exports.default = EmployeeController;
//# sourceMappingURL=employee.controller.js.map