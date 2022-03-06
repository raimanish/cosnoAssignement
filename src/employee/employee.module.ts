import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { EmployeeSubscriber } from './employee.subscriber';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRepository } from './employee.repository';
import { EmployeeLoginHistoryModule } from 'src/employee-login-history/employee-login-history.module';
import { EmployeeLoginModule } from 'src/employee-login/employee-login.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeRepository]),
    EmployeeLoginModule,
    EmployeeLoginHistoryModule,
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeSubscriber],
})
export class EmployeeModule {}
