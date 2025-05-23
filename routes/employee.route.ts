import express from "express";
import EmployeeRepository from "../repositories/employee.repository";
import datasource from "../db/data-source";
import Employee from "../entities/employee.entity";
import EmployeeService from "../services/employee.service";
import EmployeeController from "../controllers/employee.controller";
import DepartmentService from "../services/department.service";
import DepartmentRepository from "../repositories/department.repository";
import Department from "../entities/department.entity";


const employeeRouter = express.Router();
const departmentRepository = new DepartmentRepository(datasource.getRepository(Department))
const departmentService = new DepartmentService(departmentRepository)
const employeeRepository = new EmployeeRepository(datasource.getRepository(Employee));
const employeeService = new EmployeeService(employeeRepository,departmentService);
const employeeController = new EmployeeController(employeeService,employeeRouter);

export {employeeService}
export default employeeRouter;

// employeeRouter.get("/", employeeController.getAllEmployees);
// employeeRouter.get("/:id", employeeController.getEmployeeById);