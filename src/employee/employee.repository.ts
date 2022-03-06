import { EmployeeEnum } from 'src/common_utilities/enum/employee.enum';
import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employee.entity';

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {
  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    const employee: Employee = await this.create();
    Object.assign(employee, createEmployeeDto);
    return employee.save();
  }

  getEmployees(take = 10, offset = 0): Promise<[Employee[], number]> {
    return this.createQueryBuilder('employees')
      .limit(take)
      .offset(offset)
      .getManyAndCount();
  }

  getEmployeeQrCode(employeeId: string): Promise<Employee> {
    return this.createQueryBuilder('employees')
      .select(['employees.id', 'employees.qrCode'])
      .where('id = :employeeId', { employeeId })
      .getOne();
  }

  updateEmployeeCheckInfo(
    eventName: EmployeeEnum,
    employee: Employee,
    transactionalEntityManager?: EntityManager,
  ): Promise<Employee> {
    Object.assign(employee, {
      currentStatus: eventName,
      lastStatusUpdatedAt: new Date(),
    });
    if (transactionalEntityManager) {
      return transactionalEntityManager.save(employee);
    }
    return employee.save();
  }
}
