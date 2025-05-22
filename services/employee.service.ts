import { CreateAddressDto } from "../dto/create-address.dto";
import Address from "../entities/address.entity";
import Department from "../entities/department.entity";
import Employee, { EmployeeRole } from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import  bcrypt  from "bcrypt" ;
class EmployeeService {
    constructor(private employeeRepository : EmployeeRepository) {}

    async createEmployee(email: string, name: string,age:number, role:EmployeeRole, password: string, address: CreateAddressDto): Promise<Employee> {
        const newAddress = new Address();
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;

        const newEmployee = new Employee();
        newEmployee.name = name;
        newEmployee.email= email;
        newEmployee.age = age;
        newEmployee.role = role;
        newEmployee.password = await bcrypt.hash(password,10);
        newEmployee.address = newAddress;
        // newEmployee.department = department;
        
        return this.employeeRepository.create(newEmployee);
    }

    async getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.findMany();
    }

    async getEmployeeById(id:number): Promise<Employee | null> {
        return this.employeeRepository.findById(id);
    }

    async getEmployeeByEmail(email:string): Promise<Employee | null> {
        return this.employeeRepository.findByEmail(email);
    }

    async updateEmployeeById(id:number, name: string, email: string, age: number, role: EmployeeRole, password:string, address: CreateAddressDto): Promise<void> {
        const existingEmployee = await this.employeeRepository.findById(id);
        if (existingEmployee) {
            const newAddress = new Address();
            newAddress.line1 = address.line1;
            newAddress.pincode = address.pincode;
            
            existingEmployee.name = name || existingEmployee.name;
            existingEmployee.email = email || existingEmployee.email;
            existingEmployee.age = age || existingEmployee.age;
            existingEmployee.role = role || existingEmployee.role;
            existingEmployee.password = await bcrypt.hash(password,10) || existingEmployee.password;
            existingEmployee.address = newAddress || existingEmployee.address;
            // existingEmployee.department = department || existingEmployee.department
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