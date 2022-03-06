import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeLoginHistoryRepository } from './employee-login-history.repository';
import { EmployeeLoginHistoryService } from './employee-login-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeLoginHistoryRepository])],
  controllers: [],
  providers: [EmployeeLoginHistoryService],
  exports: [EmployeeLoginHistoryService],
})
export class EmployeeLoginHistoryModule {}
