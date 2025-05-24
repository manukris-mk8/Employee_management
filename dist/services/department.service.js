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
const department_entity_1 = __importDefault(require("../entities/department.entity"));
const logger_service_1 = require("./logger.service");
const httpExceptions_1 = __importDefault(require("../exceptions/httpExceptions"));
class DepartmentService {
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
        this.logger = logger_service_1.LoggerService.getInstance('DepartmentService');
    }
    createDepartment(name) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("create department -- START--");
            const newDepartment = new department_entity_1.default();
            newDepartment.name = name;
            this.logger.info("create department -- END--");
            return this.departmentRepository.create(newDepartment);
        });
    }
    getAllDepartments() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("get all departments --START--");
            const departments = yield this.departmentRepository.findMany();
            this.logger.info(`get all departments SUCCESS: Retrieved ${departments.length} departments`);
            return departments;
        });
    }
    getDepartmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("get all departments --START--");
            const department = yield this.departmentRepository.findById(id);
            if (!department) {
                this.logger.error(`getDepartmentById - FAILED: Department with ID ${id} not found`);
                throw new httpExceptions_1.default(404, "Department not found");
            }
            this.logger.info(`getDepartmentById - SUCCESS: Found department with ID ${id}`);
            return department;
        });
    }
    updateDepartmentById(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info(`updateDepartmentById - START: ID = ${id}`);
            const existingDepartment = yield this.departmentRepository.findById(id);
            if (existingDepartment) {
                existingDepartment.name = name;
                yield this.departmentRepository.update(id, existingDepartment);
                this.logger.info(`updateDepartmentById - SUCCESS: Updated department with ID ${id}`);
            }
            else {
                this.logger.error(`updateDepartmentById - FAILED: department with ID ${id} not found`);
                throw new httpExceptions_1.default(400, `Department with ID ${id} not found`);
            }
        });
    }
    // async addEmployeesToDepartment(id:number,employees:number[]) : Promise<void> {
    //     const existingDepartment = await this.departmentRepository.findById(id);
    //     const employeeDto = plainToInstance(UpdateEmployeeDto, id);
    //     if (existingDepartment){
    //         for (const emp of employees) {
    //             await this.employeeService.updateEmployeeById(emp,employeeDto)
    //         }
    //     }
    // }
    removeDepartmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info(`removeDepartmentById - START: ID = ${id}`);
            const existingDepartment = yield this.departmentRepository.findById(id);
            if (existingDepartment) {
                yield this.departmentRepository.remove(existingDepartment);
                this.logger.info(`removeDepartmentById - SUCCESS: Removed department with ID ${id}`);
            }
            else {
                this.logger.error(`removeDepartmentById - NOT FOUND: department with ID ${id}`);
                throw new httpExceptions_1.default(400, "Invalid department ID");
            }
        });
    }
}
exports.default = DepartmentService;
//# sourceMappingURL=department.service.js.map