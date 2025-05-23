import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import Department from "./department.entity";

export enum EmployeeRole {
  UI = 'UI',
  UX = 'UX',
  DEVELOPER = 'DEVELOPER',
  HR = 'HR'
}

export enum Status {
 ACTIVE = "ACTIVE",
 INACTIVE = "INACTIVE",
 PROBATION = "PROBATION"
}

@Entity()
class Employee extends AbstractEntity {

  @Column({unique: true})
  employeeId: string

  @Column({ unique: true })
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
  role: EmployeeRole;

  @OneToOne(() => Address, (address) => address.employee, {
    cascade: true,
  })
  address: Address;

  @ManyToOne(() => Department, (department) => department.employees, {
    onDelete: 'CASCADE'
  })
  department: Department;

  @Column()
  password: string;

  @Column()
  experience: number;

   @Column({
    type: 'enum',
    enum: Status,
    default: Status.INACTIVE
  })
  status: Status;

  @Column({type:"date"})
  dateOfJoining: Date;
}

export default Employee;
