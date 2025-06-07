import { Column, MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterMedicalDataTable1749324953411 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'medicaldatas',
      new TableColumn({
        name: 'date_exam',
        type: 'date',
        isNullable: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('medicaldatas', 'data_exam');
  }
}
