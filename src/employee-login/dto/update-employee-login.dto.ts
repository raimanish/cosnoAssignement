import { IsNotEmpty } from 'class-validator';

export class UpdateEmployeeLoginDto {
  @IsNotEmpty()
  checkOut: Date;
}
