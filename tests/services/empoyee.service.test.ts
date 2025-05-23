import { when } from 'jest-when';
import { mock, MockProxy } from 'jest-mock-extended';
import EmployeeRepository from '../../repositories/employee.repository';
import EmployeeService from '../../services/employee.service';
import Employee from '../../entities/employee.entity';


describe('EmployeeService', () => {

    let employeeRepository: MockProxy<EmployeeRepository>;
    let employeeService: EmployeeService;

    beforeEach(() => {
    employeeRepository = mock<EmployeeRepository>();
    employeeService = new EmployeeService(employeeRepository)
})

    describe('getEmployeeById', () => {
        it('should return value when user with proper id exist', async() => {
            const mockEmployee = {id:21, name:"Employeename"} as Employee;
            when(employeeRepository.findById).calledWith(1).mockReturnValue(mockEmployee);
            const result = await employeeService.getEmployeeById(1)
            expect(result).toEqual({id:21, name:"Employeename"})
        })      

        it('should throw error when user with id does not exist', async() => {
            when(employeeRepository.findById).calledWith(2).mockReturnValue(null);
            expect(employeeService.getEmployeeById(2)).rejects.toThrow("Employee not found");
            expect(employeeRepository.findById).toHaveBeenCalledWith(2)
        })      

    })  
})