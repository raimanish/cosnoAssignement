import { IsEnum, IsNotEmpty } from 'class-validator';
import { EmployeeEnum } from 'src/common_utilities/enum/employee.enum';

export class CreateEmployeeLoginHistoryDto {
  @IsNotEmpty()
  @IsEnum(EmployeeEnum)
  eventName: EmployeeEnum;

  @IsNotEmpty()
  loginDate: Date;
}
