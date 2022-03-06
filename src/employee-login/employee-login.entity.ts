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

@Entity({ name: 'employee_login' })
export class EmployeeLogin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeId: string;

  @Column({
    type: 'time without time zone',
  })
  checkIn: Date;

  @Column({
    type: 'time without time zone',
  })
  checkOut: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Employee, (employee) => employee.employeeLogin)
  employee: Employee;
}
