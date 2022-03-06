import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeLoginModule } from './employee-login/employee-login.module';
import { EmployeeLoginHistoryModule } from './employee-login-history/employee-login-history.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    EmployeeModule,
    EmployeeLoginModule,
    EmployeeLoginHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
