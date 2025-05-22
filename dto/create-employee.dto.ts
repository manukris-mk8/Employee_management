import { IsEmail, IsEnum, isNotEmpty, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./create-address.dto";
import { Type } from "class-transformer";
import { EmployeeRole } from "../entities/employee.entity";

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  password: string;

  @IsEnum(EmployeeRole)
  role: EmployeeRole

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}