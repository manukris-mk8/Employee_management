import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateEmployeeDto } from "./create-employee.dto";

export class CreateDepartmentDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateNested({each: true})
  @Type(() => CreateEmployeeDto)
  employees: CreateEmployeeDto[];
}