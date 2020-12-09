import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class News1607013977291 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'news',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'images',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                    }, 
                    {
                        name: 'content',
                        type: 'varchar',
                    },
                    {
                        name: 'date',
                        type: 'varchar',
                    }
                ]

            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('news')
    }

}
