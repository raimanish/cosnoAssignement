import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { Employee } from './employee.entity';
//import QRCode from 'qrcode' This is not working even it is given is documentation

const qrcode = require('qrcode');

@Injectable()
export class EmployeeSubscriber implements EntitySubscriberInterface<Employee> {
  constructor(@InjectConnection() readonly connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Employee;
  }

  async beforeInsert(
    event: InsertEvent<Employee>,
  ): Promise<void | Promise<any>> {
    if (event.entity) {
      const data = JSON.stringify({ id: event.entity.id });
      const qrData = await qrcode.toDataURL(data);
      event.entity.qrCode = qrData;
    }
  }
}
