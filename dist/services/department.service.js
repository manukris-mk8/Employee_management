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
class DepartmentService {
    constructor(departmentRepository, employeeService) {
        this.departmentRepository = departmentRepository;
        this.employeeService = employeeService;
        this.employeeService = employeeService;
    }
    createDepartment(name, employeesDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const savedEmployees = [];
            for (const employeeDto of employeesDto) {
                const savedEmployee = yield this.employeeService.createEmployee(employeeDto.email, employeeDto.name, employeeDto.age, employeeDto.role, employeeDto.password, employeeDto.address);
                savedEmployees.push(savedEmployee);
            }
            const newDepartment = new department_entity_1.default();
            newDepartment.name = name;
            newDepartment.employees = savedEmployees;
            return this.departmentRepository.create(newDepartment);
        });
    }
    getAllDepartments() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.departmentRepository.findMany();
        });
    }
    getDepartmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.departmentRepository.findById(id);
        });
    }
    updateDepartmentById(id, name, employeesDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingDepartment = yield this.departmentRepository.findById(id);
            if (existingDepartment) {
                const newEmployees = [];
                for (const dto of employeesDto) {
                    const employee = yield this.employeeService.createEmployee(dto.email, dto.name, dto.age, dto.role, dto.password, dto.address);
                    newEmployees.push(employee);
                }
                existingDepartment.name = name;
                existingDepartment.employees = newEmployees;
                yield this.departmentRepository.update(id, existingDepartment);
            }
        });
    }
    removeDepartmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingDepartment = yield this.departmentRepository.findById(id);
            if (existingDepartment) {
                yield this.departmentRepository.remove(existingDepartment);
            }
        });
    }
}
exports.default = DepartmentService;
//# sourceMappingURL=department.service.js.map