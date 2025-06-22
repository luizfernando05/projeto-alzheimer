import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMedicalDataTable1749323771966 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'medicaldatas',
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
            name: 'bmi',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'sleep_quality',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'cholesterol_ldl',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'cholesterol_hdl',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'cholesterol_triglycerides',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'mmse',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'functional_assessment',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'memory_complaints',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'behavioral_problems',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'adl',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'patient_id',
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
      'medicaldatas',
      new TableForeignKey({
        columnNames: ['patient_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'patients',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('medicaldatas');
  }
}
