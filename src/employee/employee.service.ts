import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/common_utilities/constant/message';
import { PaginateDto } from 'src/shared/dto/paginate.dto';
import { getManager } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { GetEmployeeDto } from './dto/get-employee.dto';
import { Employee } from './employee.entity';
import { EmployeeRepository } from './employee.repository';
import * as moment from 'moment';
import { EmployeeLoginService } from 'src/employee-login/employee-login.service';
import { EmployeeLogin } from 'src/employee-login/employee-login.entity';
import { CreateEmployeeLoginDto } from 'src/employee-login/dto/create-employee-login.dto';
import { EmployeeEnum } from 'src/common_utilities/enum/employee.enum';
import { EmployeeLoginHistoryService } from 'src/employee-login-history/employee-login-history.service';
import { CreateEmployeeLoginHistoryDto } from 'src/employee-login-history/dto/create-employee-login-history.dto';
import { GetEmployeeHistoryDto } from 'src/employee-login/dto/get-employee-history.dto';
@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeRepository)
    private employeeRepository: EmployeeRepository,
    private employeeLoginService: EmployeeLoginService,
    private employeeLoginHistory: EmployeeLoginHistoryService,
  ) {}
  create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeRepository.createEmployee(createEmployeeDto);
  }

  getEmployees(paginateDto: PaginateDto): Promise<[Employee[], number]> {
    const { take, offset } = paginateDto;
    return this.employeeRepository.getEmployees(take, offset);
  }

  async getEmployeeQrCode(getEmployeeDto: GetEmployeeDto): Promise<Employee> {
    const { employeeId } = getEmployeeDto;
    const employee = await this.employeeRepository.findOne(employeeId);
    if (!employee) {
      throw new NotFoundException(Message.employee.notFound);
    }
    return this.employeeRepository.getEmployeeQrCode(employeeId);
  }

  async getEmployee(getEmployeeDto: GetEmployeeDto): Promise<Employee> {
    const { employeeId } = getEmployeeDto;
    const employee = await this.employeeRepository.findOne(employeeId);
    if (!employee) {
      throw new NotFoundException(Message.employee.notFound);
    }
    return employee;
  }

  async getEmployeeHistory(
    getEmployeeDto: GetEmployeeDto,
    getEmployeeHistoryDto: GetEmployeeHistoryDto,
    paginateDto: PaginateDto,
  ): Promise<[EmployeeLogin[], number]> {
    const { employeeId } = getEmployeeDto;
    const { startDate, endDate } = getEmployeeHistoryDto;
    const { take, offset } = paginateDto;
    const employee = await this.employeeRepository.findOne(employeeId);
    if (!employee) {
      throw new NotFoundException(Message.employee.notFound);
    }
    const startDay = moment(startDate, 'YYYY-MM-DD')
      .startOf('day')
      .utcOffset(0, true);

    const endDay = moment(endDate, 'YYYY-MM-DD')
      .endOf('day')
      .utcOffset(0, true);
    return this.employeeLoginService.getEmployeeEntry(
      employeeId,
      startDay,
      endDay,
      take,
      offset,
    );
  }

  async updateEmployeeLogin(getEmployeeDto: GetEmployeeDto): Promise<Employee> {
    const { employeeId } = getEmployeeDto;
    const employee = await this.employeeRepository.findOne(employeeId);
    let eventName: EmployeeEnum = EmployeeEnum.IN;
    if (!employee) {
      throw new NotFoundException(Message.employee.notFound);
    }

    await getManager().transaction(async (transactionalEntityManager) => {
      const startDay = moment(new Date(), 'YYYY-MM-DD')
        .startOf('day')
        .utcOffset(0, true);

      const endDay = moment(new Date(), 'YYYY-MM-DD')
        .endOf('day')
        .utcOffset(0, true);
      console.log(startDay, endDay);
      const employeeLogin: EmployeeLogin =
        await this.employeeLoginService.getTodayEntry(
          employeeId,
          startDay,
          endDay,
        );

      if (!employeeLogin) {
        const createEmployeeLoginDto: CreateEmployeeLoginDto = {
          checkIn: new Date(),
        };
        await this.employeeLoginService.createEmployeeLogin(
          createEmployeeLoginDto,
          employee,
          transactionalEntityManager,
        );
      }

      if (employee.currentStatus) {
        eventName =
          employee.currentStatus == EmployeeEnum.IN
            ? EmployeeEnum.OUT
            : EmployeeEnum.IN;
      }

      await this.employeeRepository.updateEmployeeCheckInfo(
        eventName,
        employee,
        transactionalEntityManager,
      );

      const createEmployeeLoginHistoryDto: CreateEmployeeLoginHistoryDto = {
        loginDate: new Date(),
        eventName,
      };
      await this.employeeLoginHistory.createEmployeeLoginHistory(
        createEmployeeLoginHistoryDto,
        employee,
        transactionalEntityManager,
      );
    });
    return this.employeeRepository.findOne(employeeId);
  }
}
