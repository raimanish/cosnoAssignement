import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Patch,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { PaginateDto } from 'src/shared/dto/paginate.dto';
import { GetEmployeeDto } from './dto/get-employee.dto';
import { Employee } from './employee.entity';
import { GetEmployeeHistoryDto } from 'src/employee-login/dto/get-employee-history.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    const employee: Employee = await this.employeeService.create(
      createEmployeeDto,
    );
    return { employee };
  }

  @Get()
  async getEmployees(@Query() paginateDto: PaginateDto) {
    const [employees, count] = await this.employeeService.getEmployees(
      paginateDto,
    );
    return { count, employees };
  }

  @Get(':employeeId/qrCode')
  async getEmployeeQrCode(@Param() getEmployeeDto: GetEmployeeDto) {
    const employee: Employee = await this.employeeService.getEmployeeQrCode(
      getEmployeeDto,
    );
    return { employee };
  }

  @Get(':employeeId/history')
  async getEmployeeHistory(
    @Param() @Param() getEmployeeDto: GetEmployeeDto,
    @Query() getEmployeeHistoryDto: GetEmployeeHistoryDto,
    @Query() paginateDto: PaginateDto,
  ) {
    const [employee, count] = await this.employeeService.getEmployeeHistory(
      getEmployeeDto,
      getEmployeeHistoryDto,
      paginateDto,
    );
    return { count, employee };
  }

  @Get(':employeeId')
  async getEmployee(@Param() getEmployeeDto: GetEmployeeDto) {
    console.log(getEmployeeDto);
    const employee: Employee = await this.employeeService.getEmployee(
      getEmployeeDto,
    );
    return { employee };
  }

  @Patch(':employeeId/login')
  async updateEmployeeLogin(@Param() getEmployeeDto: GetEmployeeDto) {
    console.log(getEmployeeDto);
    const employee: Employee = await this.employeeService.updateEmployeeLogin(
      getEmployeeDto,
    );
    return { employee };
  }
}
