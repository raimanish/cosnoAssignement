import { IsNotEmpty } from 'class-validator';

export class CreateEmployeeLoginDto {
  @IsNotEmpty()
  checkIn: Date;
}
