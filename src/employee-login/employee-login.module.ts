import { Module } from '@nestjs/common';
import { EmployeeLoginService } from './employee-login.service';
import { EmployeeLoginRepository } from './employee-login.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeLoginRepository])],
  controllers: [],
  providers: [EmployeeLoginService],
  exports: [EmployeeLoginService],
})
export class EmployeeLoginModule {}
