import { Repository } from 'typeorm';
import { mock, MockProxy } from 'jest-mock-extended';
import EmployeeRepository from '../../repositories/employee.repository';
import Employee from '../../entities/employee.entity';

describe('EmployeeRepository', () => {
  let repository: MockProxy<Repository<Employee>>;
  let employeeRepository: EmployeeRepository;

  beforeEach(() => {
    repository = mock<Repository<Employee>>();
    employeeRepository = new EmployeeRepository(repository);
  });

  describe('create', () => {
    it('should save a new employee', async () => {
      const employee = { id: 1, name: 'John' } as Employee;
      repository.save.mockResolvedValue(employee);

      const result = await employeeRepository.create(employee);

      expect(repository.save).toHaveBeenCalledWith(employee);
      expect(result).toEqual(employee);
    });
  });

  describe('findMany', () => {
    it('should return all employees with address and department', async () => {
      const employees = [
        { id: 1, name: 'John', address: {}, department: {} },
      ] as Employee[];
      repository.find.mockResolvedValue(employees);

      const result = await employeeRepository.findMany();

      expect(repository.find).toHaveBeenCalledWith({
        relations: { address: true, department: true },
      });
      expect(result).toEqual(employees);
    });
  });

  describe('findById', () => {
    it('should return employee by ID with address and department', async () => {
      const employee = { id: 1, name: 'John', address: {}, department: {} } as Employee;
      repository.findOne.mockResolvedValue(employee);

      const result = await employeeRepository.findById(1);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: { address: true, department: true },
      });
      expect(result).toEqual(employee);
    });

    it('should return null if not found', async () => {
      repository.findOne.mockResolvedValue(null);

      const result = await employeeRepository.findById(999);

      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should return employee by email', async () => {
      const employee = { id: 1, name: 'John', email: 'john@example.com' } as Employee;
      repository.findOne.mockResolvedValue(employee);

      const result = await employeeRepository.findByEmail('john@example.com');

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { email: 'john@example.com' },
      });
      expect(result).toEqual(employee);
    });

    it('should return null if not found by email', async () => {
      repository.findOne.mockResolvedValue(null);

      const result = await employeeRepository.findByEmail('unknown@example.com');

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update employee', async () => {
      const employee = { id: 1, name: 'John' } as Employee;
      await employeeRepository.update(1, employee);

      expect(repository.save).toHaveBeenCalledWith({ id: 1, name: 'John' });
    });
  });

  describe('delete', () => {
    it('should delete employee by ID', async () => {
      await employeeRepository.delete(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('remove', () => {
    it('should soft-remove employee', async () => {
      const employee = { id: 1, name: 'John' } as Employee;
      await employeeRepository.remove(employee);
      expect(repository.softRemove).toHaveBeenCalledWith(employee);
    });
  });
});
