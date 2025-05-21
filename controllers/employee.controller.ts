import HttpException from "../exceptions/httpExceptions";
import EmployeeService from "../services/employee.service";
import {Request, Router, NextFunction, Response} from "express";
import { isEmail } from "../validators/emailValidator";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import Address from "../entities/address.entity";

class EmployeeController {
    constructor(private employeeService: EmployeeService, router: Router) {
        router.post("/",this.createEmployee.bind(this));
        router.get("/", this.getAllEmployees.bind(this));
        router.get("/:id", this.getEmployeeById.bind(this));
        router.put("/:id",this.updateEmployee.bind(this));
        router.delete("/:id",this.removeEmployee.bind(this));
    }

    async createEmployee (req: Request, res: Response, next: NextFunction) {
            
        try {
            const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
            const errors = await validate(createEmployeeDto);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new HttpException(400, JSON.stringify(errors));
             }
            const savedEmployee = await this.employeeService.createEmployee(
                createEmployeeDto.email,
                createEmployeeDto.name,
                createEmployeeDto.age,
                createEmployeeDto.address
            );
            res.status(201).send(savedEmployee);
        } 
        catch (error) {
            next(error);
        }
      
    }

    async getAllEmployees (req: Request, res: Response, next: NextFunction) {
        try {
            const employees = await this.employeeService.getAllEmployees();
            res.status(200).send(employees);
        } catch (error) {
            next(error);
        }
    }

    async getEmployeeById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            if(isNaN(id)) {
                throw new HttpException(400,"Invalid employee ID");
            }
            const employee = await this.employeeService.getEmployeeById(id);
            if(!employee) {
                throw new HttpException(404,"employee not found");
            }
            res.status(200).send(employee);
        } catch (error) {
            console.log(error);
            next(error);
        }
        
    }

    async updateEmployee(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            if(isNaN(id)) {
                throw new HttpException(400,"Invalid employee ID");
            }
            const employeeDto = plainToInstance(CreateEmployeeDto, req.body);
            const errors = await validate(employeeDto);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new HttpException(400, JSON.stringify(errors));
             }
            await this.employeeService.updateEmployeeById(id,employeeDto.name,employeeDto.email,employeeDto.age,employeeDto.address);
            res.status(200).send({ message: "Employee updated successfully" });
            
        } catch (error) {
            next(error)
            
        }
    }

    // async deleteEmployee(req: Request, res: Response) {
    //     const id = Number(req.params.id);
    //     await this.employeeService.deleteEmployeeById(id);
    //     res.status(200).send();
    // }

    async removeEmployee(req: Request, res: Response,next: NextFunction) {
        try {
            const id = Number(req.params.id);
            if(isNaN(id)) {
                throw new HttpException(400,"Invalid employee ID");
            }
            await this.employeeService.removeEmployeeById(id);
            res.status(200).send({ message: "Employee deleted successfully" });
            
        } catch (error) {
            next(error);
        }
    }
}

export default EmployeeController;