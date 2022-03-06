import { IsNotEmpty, Matches } from 'class-validator';
import { Message } from 'src/common_utilities/constant/message';
import { Regex } from 'src/common_utilities/constant/regex';

export class GetEmployeeDto {
  @IsNotEmpty()
  @Matches(Regex.UUID, {
    message: Message.error.invalidIdFormat,
  })
  employeeId: string;
}
