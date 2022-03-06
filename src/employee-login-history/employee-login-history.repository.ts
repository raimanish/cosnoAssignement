import { Employee } from 'src/employee/employee.entity';
import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { CreateEmployeeLoginHistoryDto } from './dto/create-employee-login-history.dto';
import { EmployeeLoginHistory } from './employee-login-history.entity';

@EntityRepository(EmployeeLoginHistory)
export class EmployeeLoginHistoryRepository extends Repository<EmployeeLoginHistory> {
  async createEmployeeLoginHistory(
    createEmployeeHistoryDto: CreateEmployeeLoginHistoryDto,
    employee: Employee,
    transactionalEntityManager?: EntityManager,
  ): Promise<EmployeeLoginHistory> {
    const employeeLoginHistory = await this.create();
    Object.assign(employeeLoginHistory, createEmployeeHistoryDto, { employee });
    if (transactionalEntityManager) {
      return transactionalEntityManager.save(employeeLoginHistory);
    }
    return employeeLoginHistory.save();
  }
}
