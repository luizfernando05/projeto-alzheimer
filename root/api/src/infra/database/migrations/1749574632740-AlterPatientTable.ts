import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterPatientTable1749574632740 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'patients',
      new TableColumn({
        name: 'ethnicity',
        type: 'varchar',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'patients',
      new TableColumn({
        name: 'educational_level',
        type: 'varchar',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'patients',
      new TableColumn({
        name: 'phone_number',
        type: 'varchar',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'patients',
      new TableColumn({
        name: 'selfie_photo',
        type: 'varchar',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('patients', 'ethnicity');
    await queryRunner.dropColumn('patients', 'educational_level');
    await queryRunner.dropColumn('patients', 'phone_number');
    await queryRunner.dropColumn('patients', 'selfie_photo');
  }
}
