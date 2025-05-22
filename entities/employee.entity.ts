import { Column,Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import Department from "./department.entity";

export enum EmployeeRole {
  UI = 'UI',
  UX = 'UX',
  DEVELOPER = 'DEVELOPER',
  HR = 'HR'
}

@Entity()
class Employee  extends AbstractEntity{

    @Column({unique:true})
    email: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column({
      type: 'enum',
      enum: EmployeeRole,
      default: EmployeeRole.DEVELOPER
    })
    role: EmployeeRole

    @OneToOne (() => Address, (address) => address.employee,{
      cascade: true,
      onDelete: 'CASCADE'
    })
    @JoinColumn()
    address: Address

    @ManyToOne (() => Department, (department) => department.employees,{
      cascade: true,
      onDelete: 'CASCADE'
    })
    department: Department

    @Column()
    password: string
  }
  
  export default Employee;
  