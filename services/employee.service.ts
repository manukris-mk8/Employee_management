import Address from "../entities/address.entity";
import Employee, { EmployeeRole } from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import bcrypt from "bcrypt";
import { LoggerService } from "./logger.service";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import DepartmentService from "./department.service";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import httpException from "../exceptions/httpExceptions";

class EmployeeService {
    private logger = LoggerService.getInstance('EmployeeService');

    constructor(private employeeRepository: EmployeeRepository, private departmentService:DepartmentService) {}

    async createEmployee(employeeDto: CreateEmployeeDto): Promise<Employee> {
        
        const {employeeId,email, name, age, role, password,departmentId, address,experience,status,dateOfJoining} = employeeDto;

        const department = await this.departmentService.getDepartmentById(departmentId)
        if(!department){
            this.logger.error("This department does not exist");
            throw new httpException(400,"invalid department id");
        }        

        this.logger.info('createEmployee - START');
        const newAddress = new Address();
        newAddress.houseNo = address.houseNo;
        newAddress.line1 = address.line1;

        newAddress.line2 = address.line2;
        newAddress.pincode = address.pincode;

        const newEmployee = new Employee();
        newEmployee.employeeId = employeeId;
        newEmployee.name = name;
        newEmployee.email = email;
        newEmployee.age = age;
        newEmployee.role = role;
        newEmployee.department = department;
        newEmployee.password = await bcrypt.hash(password, 10);
        newEmployee.address = newAddress;
        newEmployee.experience = experience;
        newEmployee.status = status;
        newEmployee.dateOfJoining = dateOfJoining;



        this.logger.debug(`Creating employee with email: ${email}`);
        const createdEmployee = await this.employeeRepository.create(newEmployee);
        this.logger.info(`createEmployee - SUCCESS: Employee with email ${email} created`);
        return createdEmployee;
    }

    async getAllEmployees(): Promise<Employee[]> {
        this.logger.info('getAllEmployees - START');
        const employees = await this.employeeRepository.findMany();
        this.logger.info(`getAllEmployees - SUCCESS: Retrieved ${employees.length} employees`);
        return employees;
    }

    async getEmployeeById(id: number): Promise<Employee | null> {
        this.logger.info(`getEmployeeById - START: ID = ${id}`);
        const employee = await this.employeeRepository.findById(id);
        if (!employee) {
            this.logger.error(`getEmployeeById - FAILED: Employee with ID ${id} not found`);
            throw new httpException(404,"Employee not found");
        }
        this.logger.info(`getEmployeeById - SUCCESS: Found employee with ID ${id}`);
        const {password, ...employeeDataWithoutPassword} = employee;

        return employeeDataWithoutPassword;
    }

    async getEmployeeByEmail(email: string): Promise<Employee | null> {
        this.logger.info(`getEmployeeByEmail - START: Email = ${email}`);
        const employee = await this.employeeRepository.findByEmail(email);
        if (!employee) {
            this.logger.warn(`getEmployeeByEmail - NOT FOUND: Email = ${email}`);
        } else {
            this.logger.info(`getEmployeeByEmail - SUCCESS: Found employee with Email = ${email}`);
        }
        return employee;
    }

    async updateEmployeeById(id: number, updateEmployeeDto?:UpdateEmployeeDto): Promise<void> {
        this.logger.info(`updateEmployeeById - START: ID = ${id}`);
        const existingEmployee = await this.employeeRepository.findById(id);

        if (existingEmployee) {
            this.logger.debug(`updateEmployeeById - Found employee with ID ${id}, updating fields`);

            const {employeeId,email, name, age, role, password,departmentId, address,experience,status,dateOfJoining} = updateEmployeeDto;

            let newAddress: Address | null;
            const department = await this.departmentService.getDepartmentById(departmentId)

                if (address) {
                    // newAddress = new Address();
                    existingEmployee.address.houseNo = address.houseNo;
                    existingEmployee.address.line1 = address.line1;
                    existingEmployee.address.line2 = address.line2;
                    existingEmployee.address.pincode = address.pincode;
                } 
            
            existingEmployee.employeeId = employeeId || existingEmployee.employeeId;
            existingEmployee.name = name || existingEmployee.name;
            existingEmployee.email = email || existingEmployee.email;
            existingEmployee.age = age || existingEmployee.age;
            existingEmployee.role = role || existingEmployee.role;
            existingEmployee.password = password && password!=='' ? await bcrypt.hash(password, 10) : existingEmployee.password;
            existingEmployee.department = department || existingEmployee.department;
            existingEmployee.address = existingEmployee.address;
            existingEmployee.experience = experience || existingEmployee.experience;
            existingEmployee.status = status || existingEmployee.status;
            existingEmployee.dateOfJoining = dateOfJoining || existingEmployee.dateOfJoining;

            await this.employeeRepository.update(id, existingEmployee);
            this.logger.info(`updateEmployeeById - SUCCESS: Updated employee with ID ${id}`);
        } else {
            this.logger.error(`updateEmployeeById - FAILED: Employee with ID ${id} not found`);
            throw new httpException(400,`Employee with ID ${id} not found`);
        }
    }

    async removeEmployeeById(id: number): Promise<void> {
        this.logger.info(`removeEmployeeById - START: ID = ${id}`);
        const existingEmployee = await this.employeeRepository.findById(id);
        if (existingEmployee) {
            await this.employeeRepository.remove(existingEmployee);
            this.logger.info(`removeEmployeeById - SUCCESS: Removed employee with ID ${id}`);
        } else {
            this.logger.error(`removeEmployeeById - NOT FOUND: Employee with ID ${id}`);
            throw new httpException(400,"Invalid employee ID");
        }
    }
}

export default EmployeeService;
