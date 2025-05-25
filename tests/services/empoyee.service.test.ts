import { when } from 'jest-when';
import { mock, MockProxy } from 'jest-mock-extended';
import EmployeeService from '../../services/employee.service';
import EmployeeRepository from '../../repositories/employee.repository';
import DepartmentService from '../../services/department.service';
import Employee, { EmployeeRole, Status } from '../../entities/employee.entity';
import Address from '../../entities/address.entity';
import httpException from '../../exceptions/httpExceptions';
import bcrypt from 'bcrypt';
import { CreateEmployeeDto } from '../../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../../dto/update-employee.dto';
import { CreateAddressDto } from '../../dto/create-address.dto';

describe('EmployeeService', () => {
  let employeeRepository: MockProxy<EmployeeRepository>;
  let departmentService: MockProxy<DepartmentService>;
  let employeeService: EmployeeService;

  beforeEach(() => {
    employeeRepository = mock<EmployeeRepository>();
    departmentService = mock<DepartmentService>();
    employeeService = new EmployeeService(employeeRepository, departmentService);
  });

  describe('createEmployee', () => {
    it('should create and return a new employee when department exists', async () => {
      const department = { id: 1, name: 'IT' };
      const createDto: CreateEmployeeDto = {
        employeeId: 'jdh452',
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
        role: EmployeeRole.HR,
        password: 'password123',
        departmentId: 1,
        address: { houseNo: '123', line1: 'Main', line2: '', pincode: '12345' },
        experience: 5,
        status: Status.ACTIVE,
        dateOfJoining: new Date(),
      };
      const hashedPassword = await bcrypt.hash(createDto.password, 10);
      const expectedEmployee = { id: 1, ...createDto, password: hashedPassword, department } ;

      when(departmentService.getDepartmentById).calledWith(1).mockResolvedValue(department);
      when(employeeRepository.create).calledWith(expect.any(Employee)).mockResolvedValue(expectedEmployee);

      const result = await employeeService.createEmployee(createDto);
      expect(result).toEqual(expectedEmployee);
    });

    it('should throw error when department does not exist', async () => {
      when(departmentService.getDepartmentById).calledWith(1).mockResolvedValue(null);
      const createDto: CreateEmployeeDto = {
        employeeId: 'jdh452',
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
        role: EmployeeRole.HR,
        password: 'password123',
        departmentId: 1,
        address: { houseNo: '123', line1: 'Main', line2: '', pincode: '12345' },
        experience: 5,
        status: Status.ACTIVE,
        dateOfJoining: new Date(),
      };
      await expect(employeeService.createEmployee(createDto)).rejects.toThrow(httpException);
    });
  });

  describe('getAllEmployees', () => {
    it('should return all employees', async () => {
      const employees = [{ id: 1 }, { id: 2 }] as Employee[];
      when(employeeRepository.findMany).mockResolvedValue(employees);
      const result = await employeeService.getAllEmployees();
      expect(result).toEqual(employees);
    });
  });

  describe('getEmployeeById', () => {
    it('should return employee if found', async () => {
      const employee = { id: 1, name: 'John' } as Employee;
      when(employeeRepository.findById).calledWith(1).mockResolvedValue(employee);
      const result = await employeeService.getEmployeeById(1);
      expect(result).toEqual(employee);
    });

    it('should throw error if employee not found', async () => {
      when(employeeRepository.findById).calledWith(2).mockResolvedValue(null);
      await expect(employeeService.getEmployeeById(2)).rejects.toThrow('Employee not found');
    });
  });

  describe('getEmployeeByEmail', () => {
    it('should return employee if found', async () => {
      const employee = { id: 1, email: 'john@example.com' } as Employee;
      when(employeeRepository.findByEmail).calledWith('john@example.com').mockResolvedValue(employee);
      const result = await employeeService.getEmployeeByEmail('john@example.com');
      expect(result).toEqual(employee);
    });

    it('should return null if not found', async () => {
      when(employeeRepository.findByEmail).calledWith('jane@example.com').mockResolvedValue(null);
      const result = await employeeService.getEmployeeByEmail('jane@example.com');
      expect(result).toBeNull();
    });
  });

  describe('updateEmployeeById', () => {
     it('should update an existing employee with provided fields', async () => {
    // Arrange
    const existingEmployee = {
      id: 1,
      name: 'John',
      // password: 'oldHash',
      employeeId: 'E123',
      email: 'john@example.com',
      age: 30,
      role: EmployeeRole.HR,
      department: { id: 1, name: 'HR' },
      address: { houseNo: '10', line1: 'Street', line2: '', pincode: '12345' },
      experience: 5,
      status: Status.ACTIVE,
      dateOfJoining: new Date('2020-01-01'),
    } ;

    const updateDto: UpdateEmployeeDto = {
      name: 'Updated Name',
      departmentId: 2,
      address: { houseNo: '10', line1: 'Street', line2: 'harfh', pincode: '12345' },
      employeeId: 'E123',
      email: 'john@example.com',
      age: 30,
      role: EmployeeRole.UI,
      experience: 5,
      status: Status.ACTIVE,
      dateOfJoining: new Date('2020-01-01'),
      // password: 'oldHash'
    };

    const department = { id: 2, name: 'Finance' };
    // const hashedPassword = await bcrypt.hash(updateDto.password,10);

    when(employeeRepository.findById).calledWith(1).mockResolvedValue(existingEmployee);
    when(departmentService.getDepartmentById).calledWith(2).mockResolvedValue(department);
    employeeRepository.update.mockResolvedValue();

    // Act
    await employeeService.updateEmployeeById(1, updateDto);

    // Assert
    expect(employeeRepository.update).toHaveBeenCalledWith(
      1,
    {
        id: 1,
        name: 'Updated Name',
        // password: hashedPassword,
        department,
        address: {
          houseNo: '10',
          line1: 'Street',
          line2: 'harfh',
          pincode: '12345',
        },
        employeeId: 'E123',
      email: 'john@example.com',
      age: 30,
      role: EmployeeRole.UI,
      experience: 5,
      status: Status.ACTIVE,
      dateOfJoining: new Date('2020-01-01'),
      },
    );
  });


    it('should throw error if employee not found', async () => {
      when(employeeRepository.findById).calledWith(2).mockResolvedValue(null);
      await expect(employeeService.updateEmployeeById(2, {
        employeeId: '',
        email: '',
        name: '',
        age: 0,
        password: '',
        departmentId: 0,
        role: EmployeeRole.UI,
        address: new CreateAddressDto,
        experience: 0,
        status: Status.ACTIVE,
        dateOfJoining: new Date()
      })).rejects.toThrow('Employee with ID 2 not found');
    });
  });

  describe('removeEmployeeById', () => {
    it('should remove existing employee', async () => {
      const existingEmployee = { id: 1 } as Employee;
      when(employeeRepository.findById).calledWith(1).mockResolvedValue(existingEmployee);
      when(employeeRepository.remove).calledWith(existingEmployee).mockResolvedValue();

      await employeeService.removeEmployeeById(1);
      expect(employeeRepository.remove).toHaveBeenCalledWith(existingEmployee);
    });

    it('should throw error if employee not found', async () => {
      when(employeeRepository.findById).calledWith(2).mockResolvedValue(null);
      await expect(employeeService.removeEmployeeById(2)).rejects.toThrow('Invalid employee ID');
    });
  });
});
