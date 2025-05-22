import { CreateEmployeeDto } from "../dto/create-employee.dto";
import Department from "../entities/department.entity";
import Employee from "../entities/employee.entity";
import DepartmentRepository from "../repositories/department.repository";
import EmployeeService from "./employee.service";

class DepartmentService {
    constructor(private departmentRepository : DepartmentRepository, private employeeService: EmployeeService) {
        this.employeeService = employeeService;
    }

   async createDepartment(name: string, employeesDto: CreateEmployeeDto[]): Promise<Department> {
  const savedEmployees = [];

  for (const employeeDto of employeesDto) {
    const savedEmployee = await this.employeeService.createEmployee(
      employeeDto.email,
      employeeDto.name,
      employeeDto.age,
      employeeDto.role,
      employeeDto.password,
      employeeDto.address
    );
    savedEmployees.push(savedEmployee);
  }

  const newDepartment = new Department();
  newDepartment.name = name;
  newDepartment.employees = savedEmployees;

  return this.departmentRepository.create(newDepartment);
}


    async getAllDepartments(): Promise<Department[]> {
        return this.departmentRepository.findMany();
    }

    async getDepartmentById(id:number): Promise<Department> | null{
        return this.departmentRepository.findById(id);
    }

    async updateDepartmentById(id:number,name: string, employeesDto: CreateEmployeeDto[]) : Promise<void> {
        const existingDepartment = await this.departmentRepository.findById(id);
        if (existingDepartment) {
              const newEmployees = [];

            for (const dto of employeesDto) {
                const employee = await this.employeeService.createEmployee(
                dto.email,
                dto.name,
                dto.age,
                dto.role,
                dto.password,
                dto.address
                );
                newEmployees.push(employee);
            }

            existingDepartment.name = name;
            existingDepartment.employees = newEmployees;

            await this.departmentRepository.update(id,existingDepartment);
        } 
    }


    async removeDepartmentById(id:number): Promise<void> {
        const existingDepartment = await this.departmentRepository.findById(id);
        if (existingDepartment) {
            await this.departmentRepository.remove(existingDepartment);
        }
    }
}

export default DepartmentService;