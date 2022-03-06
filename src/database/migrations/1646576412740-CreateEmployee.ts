import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEmployee1646576412740 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employees',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: `public.uuid_generate_v4()`,
          },
          {
            name: 'firstName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'lastName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'qrCode',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'currentStatus',
            type: 'enum',
            enum: ['in', 'out'],
            isNullable: true,
          },
          {
            name: 'lastStatusUpdatedAt',
            type: 'timestamp without time zone',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp without time zone',
            isNullable: false,
            default: `CURRENT_TIMESTAMP`,
            onUpdate: `CURRENT_TIMESTAMP`,
          },
          {
            name: 'updatedAt',
            type: 'timestamp without time zone',
            isNullable: false,
            default: `CURRENT_TIMESTAMP`,
            onUpdate: `CURRENT_TIMESTAMP`,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('employees');
  }
}
