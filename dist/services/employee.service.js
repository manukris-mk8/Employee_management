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
const address_entity_1 = __importDefault(require("../entities/address.entity"));
const employee_entity_1 = __importDefault(require("../entities/employee.entity"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const logger_service_1 = require("./logger.service");
const httpExceptions_1 = __importDefault(require("../exceptions/httpExceptions"));
class EmployeeService {
    constructor(employeeRepository, departmentService) {
        this.employeeRepository = employeeRepository;
        this.departmentService = departmentService;
        this.logger = logger_service_1.LoggerService.getInstance('EmployeeService');
    }
    createEmployee(employeeDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { employeeId, email, name, age, role, password, departmentId, address, experience, status, dateOfJoining } = employeeDto;
            const department = yield this.departmentService.getDepartmentById(departmentId);
            if (!department) {
                this.logger.error("This department does not exist");
                throw new httpExceptions_1.default(400, "invalid department id");
            }
            this.logger.info('createEmployee - START');
            const newAddress = new address_entity_1.default();
            newAddress.houseNo = address.houseNo;
            newAddress.line1 = address.line1;
            newAddress.line2 = address.line2;
            newAddress.pincode = address.pincode;
            const newEmployee = new employee_entity_1.default();
            newEmployee.employeeId = employeeId;
            newEmployee.name = name;
            newEmployee.email = email;
            newEmployee.age = age;
            newEmployee.role = role;
            newEmployee.department = department;
            newEmployee.password = yield bcrypt_1.default.hash(password, 10);
            newEmployee.address = newAddress;
            newEmployee.experience = experience;
            newEmployee.status = status;
            newEmployee.dateOfJoining = dateOfJoining;
            this.logger.debug(`Creating employee with email: ${email}`);
            const createdEmployee = yield this.employeeRepository.create(newEmployee);
            this.logger.info(`createEmployee - SUCCESS: Employee with email ${email} created`);
            return createdEmployee;
        });
    }
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('getAllEmployees - START');
            const employees = yield this.employeeRepository.findMany();
            this.logger.info(`getAllEmployees - SUCCESS: Retrieved ${employees.length} employees`);
            return employees;
        });
    }
    getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info(`getEmployeeById - START: ID = ${id}`);
            const employee = yield this.employeeRepository.findById(id);
            if (!employee) {
                this.logger.error(`getEmployeeById - FAILED: Employee with ID ${id} not found`);
                throw new httpExceptions_1.default(404, "Employee not found");
            }
            this.logger.info(`getEmployeeById - SUCCESS: Found employee with ID ${id}`);
            return employee;
        });
    }
    getEmployeeByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info(`getEmployeeByEmail - START: Email = ${email}`);
            const employee = yield this.employeeRepository.findByEmail(email);
            if (!employee) {
                this.logger.warn(`getEmployeeByEmail - NOT FOUND: Email = ${email}`);
            }
            else {
                this.logger.info(`getEmployeeByEmail - SUCCESS: Found employee with Email = ${email}`);
            }
            return employee;
        });
    }
    updateEmployeeById(id, updateEmployeeDto) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info(`updateEmployeeById - START: ID = ${id}`);
            const existingEmployee = yield this.employeeRepository.findById(id);
            if (existingEmployee) {
                this.logger.debug(`updateEmployeeById - Found employee with ID ${id}, updating fields`);
                const { employeeId, email, name, age, role, password, departmentId, address, experience, status, dateOfJoining } = updateEmployeeDto;
                let newAddress;
                const department = yield this.departmentService.getDepartmentById(departmentId);
                if (address) {
                    newAddress = new address_entity_1.default();
                    newAddress.houseNo = address.houseNo;
                    newAddress.line1 = address.line1;
                    newAddress.line2 = address.line2;
                    newAddress.pincode = address.pincode;
                }
                else {
                    newAddress = null;
                }
                existingEmployee.employeeId = employeeId || existingEmployee.employeeId;
                existingEmployee.name = name || existingEmployee.name;
                existingEmployee.email = email || existingEmployee.email;
                existingEmployee.age = age || existingEmployee.age;
                existingEmployee.role = role || existingEmployee.role;
                existingEmployee.password = password ? yield bcrypt_1.default.hash(password, 10) : existingEmployee.password;
                existingEmployee.department = department || existingEmployee.department;
                existingEmployee.address = newAddress ? newAddress : existingEmployee.address;
                existingEmployee.experience = experience || existingEmployee.experience;
                existingEmployee.status = status || existingEmployee.status;
                existingEmployee.dateOfJoining = dateOfJoining || existingEmployee.dateOfJoining;
                yield this.employeeRepository.update(id, existingEmployee);
                this.logger.info(`updateEmployeeById - SUCCESS: Updated employee with ID ${id}`);
            }
            else {
                this.logger.error(`updateEmployeeById - FAILED: Employee with ID ${id} not found`);
                throw new httpExceptions_1.default(400, `Employee with ID ${id} not found`);
            }
        });
    }
    removeEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info(`removeEmployeeById - START: ID = ${id}`);
            const existingEmployee = yield this.employeeRepository.findById(id);
            if (existingEmployee) {
                yield this.employeeRepository.remove(existingEmployee);
                this.logger.info(`removeEmployeeById - SUCCESS: Removed employee with ID ${id}`);
            }
            else {
                this.logger.error(`removeEmployeeById - NOT FOUND: Employee with ID ${id}`);
                throw new httpExceptions_1.default(400, "Invalid employee ID");
            }
        });
    }
}
exports.default = EmployeeService;
//# sourceMappingURL=employee.service.js.map