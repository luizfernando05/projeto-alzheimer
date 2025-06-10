import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterMedicalDataTableWithMainSymptoms1749576592846
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'medicaldatas',
      new TableColumn({
        name: 'confusion',
        type: 'boolean',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'medicaldatas',
      new TableColumn({
        name: 'disorientation',
        type: 'boolean',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'medicaldatas',
      new TableColumn({
        name: 'personality_changes',
        type: 'boolean',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'medicaldatas',
      new TableColumn({
        name: 'difficulty_completing_tasks',
        type: 'boolean',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'medicaldatas',
      new TableColumn({
        name: 'forgetfulness',
        type: 'boolean',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('medicaldatas', 'confusion');
    await queryRunner.dropColumn('medicaldatas', 'disorientation');
    await queryRunner.dropColumn('medicaldatas', 'personality_changes');
    await queryRunner.dropColumn('medicaldatas', 'difficulty_completing_tasks');
    await queryRunner.dropColumn('medicaldatas', 'forgetfulness');
  }
}
