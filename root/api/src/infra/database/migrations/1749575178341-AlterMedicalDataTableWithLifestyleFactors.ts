import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterMedicalDataTableWithLifestyleFactors1749575178341
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'medicaldatas',
      new TableColumn({
        name: 'smoking',
        type: 'boolean',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'medicaldatas',
      new TableColumn({
        name: 'alcohol_consumption',
        type: 'integer',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'medicaldatas',
      new TableColumn({
        name: 'physical_activity',
        type: 'integer',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'medicaldatas',
      new TableColumn({
        name: 'diet_quality ',
        type: 'integer',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'medicaldatas',
      new TableColumn({
        name: 'weight',
        type: 'decimal',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'medicaldatas',
      new TableColumn({
        name: 'heigth',
        type: 'decimal',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
