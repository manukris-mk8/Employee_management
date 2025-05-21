import { plainToInstance } from "class-transformer";
import { CreateAddressDto } from "../dto/create-address.dto";
import Address from "../entities/address.entity";
import Employee from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";

class EmployeeService {
    constructor(private employeeRepository : EmployeeRepository) {}

    async createEmployee(email: string, name: string,age:number, address: CreateAddressDto): Promise<Employee> {
        const newAddress = new Address();
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;

        const newEmployee = new Employee();
        newEmployee.name = name;
        newEmployee.email= email;
        newEmployee.age = age;
        newEmployee.address = newAddress;
        
        return this.employeeRepository.create(newEmployee);
    }

    async getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.findMany();
    }

    async getEmployeeById(id:number): Promise<Employee> {
        return this.employeeRepository.findById(id);
    }

    async updateEmployeeById(id:number, name: string, email: string, age: number, address: CreateAddressDto): Promise<void> {
        const existingEmployee = await this.employeeRepository.findById(id);
        if (existingEmployee) {
            const newAddress = new Address();
            newAddress.line1 = address.line1;
            newAddress.pincode = address.pincode;
            
            existingEmployee.name = name || existingEmployee.name;
            existingEmployee.email = email || existingEmployee.email;
            existingEmployee.age = age || existingEmployee.age;
            existingEmployee.address = newAddress || existingEmployee.address;
            await this.employeeRepository.update(id,existingEmployee);
        } 
    }

    // async deleteEmployeeById(id:number): Promise<void> {
    //     const existingEmployee = await this.employeeRepository.findById(id);
    //     if (existingEmployee) {
    //         await this.employeeRepository.delete(id);
    //     }
    // }

    async removeEmployeeById(id:number): Promise<void> {
        const existingEmployee = await this.employeeRepository.findById(id);
        if (existingEmployee) {
            await this.employeeRepository.remove(existingEmployee);
        }
    }
}

export default EmployeeService;