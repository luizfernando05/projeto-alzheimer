import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterMedicalDataTableWithClinicalMeasurements1749576933694
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'medicaldatas',
      new TableColumn({
        name: 'systolicBP',
        type: 'decimal',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'medicaldatas',
      new TableColumn({
        name: 'DiastolicBP',
        type: 'decimal',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'medicaldatas',
      new TableColumn({
        name: 'cholesterol_total',
        type: 'decimal',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('medicaldatas', 'systolicBP');
    await queryRunner.dropColumn('medicaldatas', 'diastolicBP');
    await queryRunner.dropColumn('medicaldatas', 'cholesterol_total');
  }
}
