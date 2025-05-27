import { Repository } from 'typeorm';
import { mock, MockProxy } from 'jest-mock-extended';
import DepartmentRepository from '../../repositories/department.repository';
import Department from '../../entities/department.entity';

describe('DepartmentRepository', () => {
  let repository: MockProxy<Repository<Department>>;
  let departmentRepository: DepartmentRepository;

  beforeEach(() => {
    repository = mock<Repository<Department>>();
    departmentRepository = new DepartmentRepository(repository);
  });

  describe('create', () => {
    it('should save a new department', async () => {
      const department = { id: 1, name: 'HR' } as Department;
      repository.save.mockResolvedValue(department);

      const result = await departmentRepository.create(department);

      expect(repository.save).toHaveBeenCalledWith(department);
      expect(result).toEqual(department);
    });
  });

  describe('findMany', () => {
    it('should return all departments with employees', async () => {
      const departments = [{ id: 1, name: 'HR' }] as Department[];
      repository.find.mockResolvedValue(departments);

      const result = await departmentRepository.findMany();

      expect(repository.find).toHaveBeenCalledWith({ relations: { employees: true } });
      expect(result).toEqual(departments);
    });
  });

  describe('findById', () => {
    it('should return department by ID with employees', async () => {
      const department = { id: 1, name: 'HR' } as Department;
      repository.findOne.mockResolvedValue(department);

      const result = await departmentRepository.findById(1);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: { employees: true } });
      expect(result).toEqual(department);
    });

    it('should return null if department not found', async () => {
      repository.findOne.mockResolvedValue(null);

      const result = await departmentRepository.findById(99);

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update department', async () => {
      const department = { id: 1, name: 'HR' } as Department;
      await departmentRepository.update(1, department);

      expect(repository.save).toHaveBeenCalledWith( department );
    });
  });

  describe('delete', () => {
    it('should delete department by ID', async () => {
      await departmentRepository.delete(1);

      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('remove', () => {
    it('should soft-remove department', async () => {
      const department = { id: 1, name: 'HR' } as Department;
      await departmentRepository.remove(department);

      expect(repository.softRemove).toHaveBeenCalledWith(department);
    });
  });
});
