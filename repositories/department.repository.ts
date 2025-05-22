import { Repository } from "typeorm";
import Department from "../entities/department.entity";

class DepartmentRepository {
    constructor(private repository: Repository<Department>) {}

    async create(department: Department) : Promise<Department> {
        return this.repository.save(department);
    }

    async findMany() : Promise<Department[]> {
        return this.repository.find({
            relations: {employees: true}
        });
    }

    async findById(id: number) : Promise<Department> {
        return this.repository.findOne({
            where: {id},
            relations : {employees :true}
        });
    }

    async update(id: number, department: Department) : Promise<void> {
        await this.repository.save({id, ...department});
    }

    async delete(id: number) : Promise<void> {
        await this.repository.delete(id);
    }

    async remove(department: Department) : Promise<void> {
        await this.repository.remove(department);
    }
}

export default DepartmentRepository;