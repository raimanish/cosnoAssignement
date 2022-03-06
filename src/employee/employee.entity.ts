import { EmployeeEnum } from 'src/common_utilities/enum/employee.enum';
import { EmployeeLoginHistory } from 'src/employee-login-history/employee-login-history.entity';
import { EmployeeLogin } from 'src/employee-login/employee-login.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'employees' })
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  qrCode: string;

  @Column({
    enum: EmployeeEnum,
  })
  currentStatus: EmployeeEnum;

  @Column()
  lastStatusUpdatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => EmployeeLogin, (employeeLogin) => employeeLogin.employee)
  employeeLogin: EmployeeLogin[];

  @OneToMany(
    () => EmployeeLoginHistory,
    (employeeLoginHistory) => employeeLoginHistory.employee,
  )
  employeeLoginHistory: EmployeeLoginHistory[];
}
