import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/employee/employee.entity';
import { EntityManager } from 'typeorm';
import { CreateEmployeeLoginDto } from './dto/create-employee-login.dto';
import { UpdateEmployeeLoginDto } from './dto/update-employee-login.dto';
import { EmployeeLogin } from './employee-login.entity';
import { EmployeeLoginRepository } from './employee-login.repository';

@Injectable()
export class EmployeeLoginService {
  constructor(
    @InjectRepository(EmployeeLoginRepository)
    private employeeLoginRepository: EmployeeLoginRepository,
  ) {}

  async getTodayEntry(
    employeeId: string,
    startDay: any,
    endDay: any,
  ): Promise<EmployeeLogin> {
    return this.employeeLoginRepository.getTodayEntry(
      employeeId,
      startDay,
      endDay,
    );
  }

  async getEmployeeEntry(
    employeeId: string,
    startDay: any,
    endDay: any,
    take,
    offset,
  ): Promise<[EmployeeLogin[], number]> {
    return this.employeeLoginRepository.getEmployeeEntry(
      employeeId,
      startDay,
      endDay,
      take,
      offset,
    );
  }

  createEmployeeLogin(
    createEmployeeLoginDto: CreateEmployeeLoginDto,
    employee: Employee,
    transactionalEntityManager?: EntityManager,
  ): Promise<EmployeeLogin> {
    return this.employeeLoginRepository.createEmployeeLogin(
      createEmployeeLoginDto,
      employee,
      transactionalEntityManager,
    );
  }

  updateEmployeeLogin(
    updateEmployeeLoginDto: UpdateEmployeeLoginDto,
    employeeLogin: EmployeeLogin,
    transactionalEntityManager?: EntityManager,
  ): Promise<EmployeeLogin> {
    return this.employeeLoginRepository.updateEmployeeLogin(
      updateEmployeeLoginDto,
      employeeLogin,
      transactionalEntityManager,
    );
  }
}
