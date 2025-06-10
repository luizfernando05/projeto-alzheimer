import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterMedicalDataTableWithMedicalHistory1749575815293
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'medicaldatas',
      new TableColumn({
        name: 'family_history',
        type: 'boolean',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'medicaldatas',
      new TableColumn({
        name: 'cardiovascular_disease',
        type: 'boolean',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'medicaldatas',
      new TableColumn({
        name: 'diabetes',
        type: 'boolean',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'medicaldatas',
      new TableColumn({
        name: 'depression ',
        type: 'boolean',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'medicaldatas',
      new TableColumn({
        name: 'head_trauma',
        type: 'boolean',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'medicaldatas',
      new TableColumn({
        name: 'hypertension',
        type: 'boolean',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('medicaldatas', 'family_history');
    await queryRunner.dropColumn('medicaldatas', 'cardiovascular_disease');
    await queryRunner.dropColumn('medicaldatas', 'diabetes');
    await queryRunner.dropColumn('medicaldatas', 'depression');
    await queryRunner.dropColumn('medicaldatas', 'head_trauma');
    await queryRunner.dropColumn('medicaldatas', 'hypertension');
  }
}
