import HttpException from "../exceptions/httpExceptions";
import {Request, Router, NextFunction, Response} from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import DepartmentService from "../services/department.service";
import { CreateDepartmentDto } from "../dto/create-department.dto";

class DepartmentController {
    constructor(private departmentService: DepartmentService, router: Router) {
        router.post("/",this.createDepartment.bind(this));
        router.get("/", this.getAllDepartments.bind(this));
        router.get("/:id", this.getDepartmentById.bind(this));
        router.put("/:id",this.updateDepartment.bind(this));
        router.delete("/:id",this.removeDepartment.bind(this));
    }

    async createDepartment (req: Request, res: Response, next: NextFunction) {
            
        try {
            const createDepartmentDto = plainToInstance(CreateDepartmentDto, req.body);
            const errors = await validate(createDepartmentDto);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new HttpException(400, JSON.stringify(errors));
             }
            const savedDepartment = await this.departmentService.createDepartment(
                createDepartmentDto.name,
                createDepartmentDto.employees
            );
            res.status(201).send(savedDepartment);
        } 
        catch (error) {
            next(error);
        }
      
    }

    async getAllDepartments (req: Request, res: Response, next: NextFunction) {
        try {
            const departments = await this.departmentService.getAllDepartments();
            res.status(200).send(departments);
        } catch (error) {
            next(error);
        }
    }

    async getDepartmentById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            if(isNaN(id)) {
                throw new HttpException(400,"Invalid department ID");
            }
            const department = await this.departmentService.getDepartmentById(id);
            if(!department) {
                throw new HttpException(404,"department not found");
            }
            res.status(200).send(department);
        } catch (error) {
            console.log(error);
            next(error);
        }
        
    }

    async updateDepartment(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            if(isNaN(id)) {
                throw new HttpException(400,"Invalid department ID");
            }
            const departmentDto = plainToInstance(CreateDepartmentDto, req.body);
            const errors = await validate(departmentDto);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new HttpException(400, JSON.stringify(errors));
             }
            await this.departmentService.updateDepartmentById(id,departmentDto.name,departmentDto.employees);
            res.status(200).send({ message: "Department updated successfully" });
            
        } catch (error) {
            next(error)
            
        }
    }

    async removeDepartment(req: Request, res: Response,next: NextFunction) {
        try {
            const id = Number(req.params.id);
            if(isNaN(id)) {
                throw new HttpException(400,"Invalid department ID");
            }
            await this.departmentService.removeDepartmentById(id);
            res.status(200).send({ message: "Department deleted successfully" });
            
        } catch (error) {
            next(error);
        }
    }
}

export default DepartmentController;