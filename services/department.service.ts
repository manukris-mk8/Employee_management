import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import Department from "../entities/department.entity";
import Employee from "../entities/employee.entity";
import DepartmentRepository from "../repositories/department.repository";
import EmployeeService from "./employee.service";
import { LoggerService } from "./logger.service";
import httpException from "../exceptions/httpExceptions";

class DepartmentService {
    private logger = LoggerService.getInstance('DepartmentService');
    
    constructor(private departmentRepository : DepartmentRepository) {
    }

   async createDepartment(name: string): Promise<Department> {
        this.logger.info("create department -- START--")
        const newDepartment = new Department();
        newDepartment.name = name;
        this.logger.info("create department -- END--")
  return this.departmentRepository.create(newDepartment);
}


    async getAllDepartments(): Promise<Department[]> {
        this.logger.info("get all departments --START--")
        const departments = await this.departmentRepository.findMany();
        this.logger.info(`get all departments SUCCESS: Retrieved ${departments.length} departments`);
        return departments;
    }

    async getDepartmentById(id:number): Promise<Department> | null{
        this.logger.info("get all departments --START--")
        const department = await this.departmentRepository.findById(id);
        if (!department){
            this.logger.error(`getDepartmentById - FAILED: Department with ID ${id} not found`);
            throw new httpException(404,"Department not found");
        }
        this.logger.info(`getDepartmentById - SUCCESS: Found department with ID ${id}`);
        return department;
    }

    async updateDepartmentById(id:number,name: string) : Promise<void> {
        this.logger.info(`updateDepartmentById - START: ID = ${id}`);
        const existingDepartment = await this.departmentRepository.findById(id);
        if (existingDepartment) {

            existingDepartment.name = name;

            await this.departmentRepository.update(id,existingDepartment);
            this.logger.info(`updateDepartmentById - SUCCESS: Updated department with ID ${id}`);
        } else {
            this.logger.error(`updateDepartmentById - FAILED: department with ID ${id} not found`);
            throw new httpException(400,`Department with ID ${id} not found`);
        } 
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


    async removeDepartmentById(id:number): Promise<void> {
        this.logger.info(`removeDepartmentById - START: ID = ${id}`);
        const existingDepartment = await this.departmentRepository.findById(id);
        if (existingDepartment) {
            await this.departmentRepository.remove(existingDepartment);
            this.logger.info(`removeDepartmentById - SUCCESS: Removed department with ID ${id}`);

        }
        else{
            this.logger.error(`removeDepartmentById - NOT FOUND: department with ID ${id}`);
            throw new httpException(400,"Invalid department ID");
        }
    }
}

export default DepartmentService;