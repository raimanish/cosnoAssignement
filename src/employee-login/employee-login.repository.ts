import { Employee } from 'src/employee/employee.entity';
import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { CreateEmployeeLoginDto } from './dto/create-employee-login.dto';
import { UpdateEmployeeLoginDto } from './dto/update-employee-login.dto';
import { EmployeeLogin } from './employee-login.entity';

@EntityRepository(EmployeeLogin)
export class EmployeeLoginRepository extends Repository<EmployeeLogin> {
  async getTodayEntry(
    employeeId: string,
    startDay: Date,
    endDay: Date,
  ): Promise<EmployeeLogin> {
    return this.createQueryBuilder('employee_login')
      .where('"checkIn" between :startDay AND :endDay', {
        startDay,
        endDay,
      })
      .andWhere('"employeeId" = :employeeId', { employeeId })
      .getOne();
  }

  async getEmployeeEntry(
    employeeId: string,
    startDay: Date,
    endDay: Date,
    take = 10,
    offset = 0,
  ): Promise<[EmployeeLogin[], number]> {
    return this.createQueryBuilder('employee_login')
      .where('"checkIn" between :startDay AND :endDay', {
        startDay,
        endDay,
      })
      .andWhere('"employeeId" = :employeeId', { employeeId })
      .limit(take)
      .offset(offset)
      .getManyAndCount();
  }

  async createEmployeeLogin(
    createEmployeeDto: CreateEmployeeLoginDto,
    employee: Employee,
    transactionalEntityManager?: EntityManager,
  ): Promise<EmployeeLogin> {
    const employeeLogin = await this.create();
    Object.assign(employeeLogin, createEmployeeDto, { employee });
    if (transactionalEntityManager) {
      transactionalEntityManager.save(employeeLogin);
    }
    return employeeLogin.save();
  }

  async updateEmployeeLogin(
    updateEmployeeDto: UpdateEmployeeLoginDto,
    employeeLogin: EmployeeLogin,
    transactionalEntityManager?: EntityManager,
  ): Promise<EmployeeLogin> {
    Object.assign(employeeLogin, updateEmployeeDto);
    if (transactionalEntityManager) {
      return transactionalEntityManager.save(employeeLogin);
    }
    return employeeLogin.save();
  }
}
