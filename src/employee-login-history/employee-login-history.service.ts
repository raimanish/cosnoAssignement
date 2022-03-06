import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/employee/employee.entity';
import { EntityManager } from 'typeorm';
import { CreateEmployeeLoginHistoryDto } from './dto/create-employee-login-history.dto';
import { EmployeeLoginHistory } from './employee-login-history.entity';
import { EmployeeLoginHistoryRepository } from './employee-login-history.repository';

@Injectable()
export class EmployeeLoginHistoryService {
  constructor(
    @InjectRepository(EmployeeLoginHistoryRepository)
    private employeeLoginHistoryRepository: EmployeeLoginHistoryRepository,
  ) {}

  async createEmployeeLoginHistory(
    createEmployeeHistoryDto: CreateEmployeeLoginHistoryDto,
    employee: Employee,
    transactionalEntityManager?: EntityManager,
  ): Promise<EmployeeLoginHistory> {
    return this.employeeLoginHistoryRepository.createEmployeeLoginHistory(
      createEmployeeHistoryDto,
      employee,
      transactionalEntityManager,
    );
  }
}
