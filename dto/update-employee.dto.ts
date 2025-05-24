import { IsEmail, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./create-address.dto";
import { Type } from "class-transformer";
import { EmployeeRole, Status } from "../entities/employee.entity";

export class UpdateEmployeeDto {
  @IsString()
  @IsOptional()
  employeeId: string

//   @IsNotEmpty()
  @IsOptional()
  @IsEmail()
  email: string;

//   @IsNotEmpty()
  @IsOptional()
  @IsString()
  name: string;

//   @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  age: number;

//   @IsNotEmpty()
  @IsOptional()
  password: string;
  
  @IsOptional()
  departmentId: number;

  @IsOptional()
  @IsEnum(EmployeeRole)
  role: EmployeeRole

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsOptional()
  @IsNumber()
  experience: number;

  @IsOptional()
  @IsEnum(Status)
  status: Status
  
  @IsOptional()
  // @IsDate()
  dateOfJoining: Date;
}