import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateDoctorTable1746052045216 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`
    //   CREATE TYPE doctor_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED')
    // `);

    await queryRunner.createTable(
      new Table({
        name: 'doctors',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'username',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'celphone',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'crm',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'crm_photo',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'selfie_photo',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['PENDING', 'APPROVED', 'REJECTED'],
            isNullable: false,
            default: `'PENDING'`,
          },
          {
            name: 'rejection_reason',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'approved_by_admin',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'doctors',
      new TableForeignKey({
        columnNames: ['approved_by_admin'],
        referencedColumnNames: ['id'],
        referencedTableName: 'admins',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('doctors');
    await queryRunner.query(`DROP TYPE doctor_status`);
  }
}
