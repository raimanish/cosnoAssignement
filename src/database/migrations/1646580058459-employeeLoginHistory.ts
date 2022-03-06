import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class employeeLoginHistory1646580058459 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employee_login_history',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: `public.uuid_generate_v4()`,
          },
          {
            name: 'employeeId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'loginDate',
            type: 'timestamp without time zone',
            isNullable: false,
          },
          {
            name: 'event',
            type: 'enum',
            enum: ['in', 'out'],
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

    await queryRunner.createForeignKey(
      'employee_login_history',
      new TableForeignKey({
        columnNames: ['employeeId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'employees',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('employee_login_history');
    const empForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('employeeId') !== -1,
    );
    await queryRunner.dropForeignKey('employee_login_history', empForeignKey);
    await queryRunner.dropColumn('employee_login_history', 'employeeId');
    await queryRunner.dropTable('employee_login_history');
  }
}
