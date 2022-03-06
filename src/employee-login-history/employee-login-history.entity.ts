import { EmployeeEnum } from 'src/common_utilities/enum/employee.enum';
import { Employee } from 'src/employee/employee.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'employee_login_history' })
export class EmployeeLoginHistory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeId: string;

  @Column({
    enum: EmployeeEnum,
  })
  event: EmployeeEnum;

  @Column({
    type: 'time without time zone',
  })
  loginDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Employee, (employee) => employee.employeeLoginHistory)
  employee: Employee;
}
