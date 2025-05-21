import { Column,Entity, JoinColumn, OneToMany } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import Employee from "./employee.entity";

@Entity()
class Department  extends AbstractEntity{

    @Column({unique:true})
    name: string;

    @OneToMany (() => Employee, (employee) => employee.department)
    employees: Employee[]
  }
  
  export default Department;
  