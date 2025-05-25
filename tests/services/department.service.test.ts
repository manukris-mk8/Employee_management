import { mock, MockProxy } from 'jest-mock-extended';
import DepartmentService from '../../services/department.service';
import DepartmentRepository from '../../repositories/department.repository';
import Department from '../../entities/department.entity';
import httpException from '../../exceptions/httpExceptions';

describe('DepartmentService', () => {
  let departmentRepository: MockProxy<DepartmentRepository>;
  let departmentService: DepartmentService;

  beforeEach(() => {
    departmentRepository = mock<DepartmentRepository>();
    departmentService = new DepartmentService(departmentRepository);
  });

  describe('createDepartment', () => {
    it('should create a new department', async () => {
      const name = 'HR';
      const newDepartment = { id: 1, name } as Department;
      departmentRepository.create.mockResolvedValue(newDepartment);

      const result = await departmentService.createDepartment(name);

      expect(result).toEqual(newDepartment);
      expect(departmentRepository.create).toHaveBeenCalledWith(expect.objectContaining({ name }));
    });
  });

  describe('getAllDepartments', () => {
    it('should return all departments', async () => {
      const departments = [
        { id: 1, name: 'HR' },
        { id: 2, name: 'Finance' },
      ] as Department[];
      departmentRepository.findMany.mockResolvedValue(departments);

      const result = await departmentService.getAllDepartments();

      expect(result).toEqual(departments);
      expect(departmentRepository.findMany).toHaveBeenCalled();
    });
  });

  describe('getDepartmentById', () => {
    it('should return department by ID', async () => {
      const department = { id: 1, name: 'HR' } as Department;
      departmentRepository.findById.mockResolvedValue(department);

      const result = await departmentService.getDepartmentById(1);

      expect(result).toEqual(department);
      expect(departmentRepository.findById).toHaveBeenCalledWith(1);
    });

    it('should throw error if department not found', async () => {
      departmentRepository.findById.mockResolvedValue(null);

      await expect(departmentService.getDepartmentById(1)).rejects.toThrow(
        new httpException(404, 'Department not found')
      );
    });
  });

  describe('updateDepartmentById', () => {
    it('should update department if found', async () => {
      const department = { id: 1, name: 'HR' } as Department;
      departmentRepository.findById.mockResolvedValue(department);
      departmentRepository.update.mockResolvedValue();

      await departmentService.updateDepartmentById(1, 'Updated HR');

      expect(departmentRepository.update).toHaveBeenCalledWith(1, expect.objectContaining({ name: 'Updated HR' }));
    });

    it('should throw error if department not found', async () => {
      departmentRepository.findById.mockResolvedValue(null);

      await expect(departmentService.updateDepartmentById(1, 'Updated')).rejects.toThrow(
        new httpException(400, 'Department with ID 1 not found')
      );
    });
  });

  describe('removeDepartmentById', () => {
    it('should remove department if found', async () => {
      const department = { id: 1, name: 'HR' } as Department;
      departmentRepository.findById.mockResolvedValue(department);
      departmentRepository.remove.mockResolvedValue();

      await departmentService.removeDepartmentById(1);

      expect(departmentRepository.remove).toHaveBeenCalledWith(department);
    });

    it('should throw error if department not found', async () => {
      departmentRepository.findById.mockResolvedValue(null);

      await expect(departmentService.removeDepartmentById(1)).rejects.toThrow(
        new httpException(400, 'Invalid department ID')
      );
    });
  });
});
