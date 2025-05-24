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
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const create_department_dto_1 = require("../dto/create-department.dto");
const authorization_middleware_1 = require("../middlewares/authorization.middleware");
const employee_entity_1 = require("../entities/employee.entity");
const logger_service_1 = require("../services/logger.service");
class DepartmentController {
    constructor(departmentService, router) {
        this.departmentService = departmentService;
        this.logger = logger_service_1.LoggerService.getInstance('DepartmentController');
        router.post("/", (0, authorization_middleware_1.checkRole)([employee_entity_1.EmployeeRole.HR, employee_entity_1.EmployeeRole.UX]), this.createDepartment.bind(this));
        router.get("/", this.getAllDepartments.bind(this));
        router.get("/:id", this.getDepartmentById.bind(this));
        router.put("/:id", (0, authorization_middleware_1.checkRole)([employee_entity_1.EmployeeRole.HR, employee_entity_1.EmployeeRole.UX]), this.updateDepartment.bind(this));
        router.delete("/:id", (0, authorization_middleware_1.checkRole)([employee_entity_1.EmployeeRole.HR, employee_entity_1.EmployeeRole.UX]), this.removeDepartment.bind(this));
    }
    createDepartment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createDepartmentDto = (0, class_transformer_1.plainToInstance)(create_department_dto_1.CreateDepartmentDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createDepartmentDto, { whitelist: true, forbidNonWhitelisted: true });
                if (errors.length > 0) {
                    this.logger.error(JSON.stringify(errors));
                    throw new httpExceptions_1.default(400, JSON.stringify(errors));
                }
                const savedDepartment = yield this.departmentService.createDepartment(createDepartmentDto.name);
                this.logger.info("department created successfully");
                res.status(201).send(savedDepartment);
            }
            catch (error) {
                this.logger.error("department creation failed" + error);
                next(error);
            }
        });
    }
    getAllDepartments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const departments = yield this.departmentService.getAllDepartments();
                this.logger.info(departments.length + "departments retrieved successfully");
                res.status(200).send(departments);
            }
            catch (error) {
                this.logger.error("departments retrieval failed" + error);
                next(error);
            }
        });
    }
    getDepartmentById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (isNaN(id)) {
                    this.logger.error("inavlid department id");
                    throw new httpExceptions_1.default(400, "Invalid department ID");
                }
                const department = yield this.departmentService.getDepartmentById(id);
                if (!department) {
                    this.logger.error("no department found with id = " + id);
                    throw new httpExceptions_1.default(404, "department not found");
                }
                this.logger.info(department + " retrieved successfully");
                res.status(200).send(department);
            }
            catch (error) {
                this.logger.error("department retrieval failed" + error);
                next(error);
            }
        });
    }
    updateDepartment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (isNaN(id)) {
                    this.logger.error("inavlid department id");
                    throw new httpExceptions_1.default(400, "Invalid department ID");
                }
                const departmentDto = (0, class_transformer_1.plainToInstance)(create_department_dto_1.CreateDepartmentDto, req.body);
                const errors = yield (0, class_validator_1.validate)(departmentDto);
                if (errors.length > 0) {
                    this.logger.error(JSON.stringify(errors));
                    throw new httpExceptions_1.default(400, JSON.stringify(errors));
                }
                yield this.departmentService.updateDepartmentById(id, departmentDto.name);
                this.logger.info("department updated successfully");
                res.status(200).send({ message: "Department updated successfully" });
            }
            catch (error) {
                this.logger.error("department updation failed" + error);
                next(error);
            }
        });
    }
    removeDepartment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (isNaN(id)) {
                    this.logger.error("inavlid department id");
                    throw new httpExceptions_1.default(400, "Invalid department ID");
                }
                yield this.departmentService.removeDepartmentById(id);
                this.logger.info("department deleted successfully");
                res.status(200).send({ message: "Department deleted successfully" });
            }
            catch (error) {
                this.logger.error("department deletion failed" + error);
                next(error);
            }
        });
    }
}
exports.default = DepartmentController;
//# sourceMappingURL=department.controller.js.map