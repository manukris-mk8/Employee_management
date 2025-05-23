import HttpException from "../exceptions/httpExceptions";
import {Request, Router, NextFunction, Response} from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import DepartmentService from "../services/department.service";
import { CreateDepartmentDto } from "../dto/create-department.dto";
import { checkRole } from "../middlewares/authorization.middleware";
import { EmployeeRole } from "../entities/employee.entity";
import { LoggerService } from "../services/logger.service";

class DepartmentController {
        private logger = LoggerService.getInstance('DepartmentController');
    
    constructor(private departmentService: DepartmentService, router: Router) {
        router.post("/",checkRole([EmployeeRole.HR,EmployeeRole.UX]),this.createDepartment.bind(this));
        router.get("/", this.getAllDepartments.bind(this));
        router.get("/:id", this.getDepartmentById.bind(this));
        router.put("/:id",checkRole([EmployeeRole.HR,EmployeeRole.UX]),this.updateDepartment.bind(this));
        router.delete("/:id",checkRole([EmployeeRole.HR,EmployeeRole.UX]),this.removeDepartment.bind(this));
    }

    async createDepartment (req: Request, res: Response, next: NextFunction) {
            
        try {
            const createDepartmentDto = plainToInstance(CreateDepartmentDto, req.body);
            const errors = await validate(createDepartmentDto, { whitelist: true, forbidNonWhitelisted: true });
            if (errors.length > 0) {
                this.logger.error(JSON.stringify(errors));
                throw new HttpException(400, JSON.stringify(errors));
             }
            const savedDepartment = await this.departmentService.createDepartment(
                createDepartmentDto.name,
            );
            this.logger.info("department created successfully");
            res.status(201).send(savedDepartment);
        } 
        catch (error) {
            this.logger.error("department creation failed" + error);
            next(error);
        }
      
    }

    async getAllDepartments (req: Request, res: Response, next: NextFunction) {
        try {
            const departments = await this.departmentService.getAllDepartments();
            this.logger.info(departments.length + "departments retrieved successfully");
            res.status(200).send(departments);
        } catch (error) {
            this.logger.error("departments retrieval failed" + error);
            next(error);
        }
    }

    async getDepartmentById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            if(isNaN(id)) {
                this.logger.error("inavlid department id")
                throw new HttpException(400,"Invalid department ID");
            }
            const department = await this.departmentService.getDepartmentById(id);
            if(!department) {
                this.logger.error("no department found with id = "+id)
                throw new HttpException(404,"department not found");
            }
            this.logger.info(department + " retrieved successfully");
            res.status(200).send(department);
        } catch (error) {
            this.logger.error("department retrieval failed" + error);
            next(error);
        }
        
    }

    async updateDepartment(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            if(isNaN(id)) {
                this.logger.error("inavlid department id")
                throw new HttpException(400,"Invalid department ID");
            }
            const departmentDto = plainToInstance(CreateDepartmentDto, req.body);
            const errors = await validate(departmentDto);
            if (errors.length > 0) {
                this.logger.error(JSON.stringify(errors));
                throw new HttpException(400, JSON.stringify(errors));
             }
            await this.departmentService.updateDepartmentById(id,departmentDto.name);
            this.logger.info("department updated successfully");
            res.status(200).send({ message: "Department updated successfully" });
            
        } catch (error) {
            this.logger.error("department updation failed" + error);
            next(error)
            
        }
    }


    async removeDepartment(req: Request, res: Response,next: NextFunction) {
        try {
            const id = Number(req.params.id);
            if(isNaN(id)) {
                this.logger.error("inavlid department id")
                throw new HttpException(400,"Invalid department ID");
            }
            await this.departmentService.removeDepartmentById(id);
            this.logger.info("department deleted successfully");
            res.status(200).send({ message: "Department deleted successfully" });
            
        } catch (error) {
            this.logger.error("department deletion failed" + error);
            next(error);
        }
    }
}

export default DepartmentController;