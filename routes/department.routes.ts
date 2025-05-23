import express from "express";
import datasource from "../db/data-source";
import DepartmentRepository from "../repositories/department.repository";
import Department from "../entities/department.entity";
import DepartmentService from "../services/department.service";
import DepartmentController from "../controllers/department.controller";
import EmployeeRepository from "../repositories/employee.repository";
import Employee from "../entities/employee.entity";
import EmployeeService from "../services/employee.service";


const departmentRouter = express.Router();
const employeeRepository = new EmployeeRepository(datasource.getRepository(Employee));

const departmentRepository = new DepartmentRepository(datasource.getRepository(Department));
const departmentService = new DepartmentService(departmentRepository);
const departmentController = new DepartmentController(departmentService,departmentRouter);

export default departmentRouter;
