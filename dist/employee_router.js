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
const express_1 = __importDefault(require("express"));
const employee_entity_1 = __importDefault(require("./employee.entity"));
const data_source_1 = __importDefault(require("./data-source"));
const employeeRouter = express_1.default.Router();
employeeRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    const employees = yield employeeRepository.find();
    res.status(200).send(employees);
}));
employeeRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    const empId = Number(req.params["id"]);
    const employee = yield employeeRepository.findOneBy({ id: empId });
    if (!employee) {
        res.status(404).send("Employee not found");
        return;
    }
    res.status(200).send(employee);
}));
employeeRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    const newEmployee = new employee_entity_1.default();
    newEmployee.email = req.body.email;
    newEmployee.name = req.body.name;
    // newEmployee.createdAt = new Date();
    // newEmployee.updatedAt = new Date();
    employeeRepository.insert(newEmployee);
    res.status(200).send(newEmployee);
}));
employeeRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const empId = Number(req.params["id"]);
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    employeeRepository.delete({ id: empId });
    res.status(200).send();
}));
employeeRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    const empId = Number(req.params["id"]);
    const employee = yield employeeRepository.findOneBy({ id: empId });
    employee.email = req.body.email || employee.email;
    employee.name = req.body.name || employee.name;
    ;
    employeeRepository.save(employee);
    console.log("update employees");
    res.status(200).send(employee);
}));
employeeRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    const empId = Number(req.params["id"]);
    // const employee = await employeeRepository.findOneBy({id:empId});
    const employee = new employee_entity_1.default();
    employee.email = req.body.email || employee.email;
    employee.name = req.body.name || employee.name;
    employeeRepository.update({ id: empId }, employee);
    console.log("update employees");
    res.status(200).send(employee);
}));
exports.default = employeeRouter;
//# sourceMappingURL=employee_router.js.map