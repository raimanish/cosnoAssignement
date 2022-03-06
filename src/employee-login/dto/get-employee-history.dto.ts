import { IsNotEmpty } from 'class-validator';

export class GetEmployeeHistoryDto {
  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;
}
