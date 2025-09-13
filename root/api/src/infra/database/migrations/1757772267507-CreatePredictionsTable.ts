import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreatePredictionsTable1757772267507 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'predictions',
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
            name: 'medical_data_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'prediction_result',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'confidence_score',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'predictions',
      new TableForeignKey({
        columnNames: ['medical_data_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'medicaldatas',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('predictions');
    const foreignKey = table!.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('medical_data_id') !== -1
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey('predictions', foreignKey);
    }

    await queryRunner.dropTable('predictions');
  }
}
