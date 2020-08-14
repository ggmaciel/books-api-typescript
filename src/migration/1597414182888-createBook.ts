import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateBook1597414182888 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'books',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid'
                    },
                    {
                        name: 'title',
                        type: 'varchar'
                    },
                    {
                        name: 'authors',
                        type: 'varchar'
                    },
                    {
                        name: 'description',
                        type: 'varchar'
                    },
                    {
                        name: 'page_count',
                        type: 'integer'
                    },
                    {
                        name: 'image_link',
                        type: 'varchar'
                    },
                    {
                        name: 'page_views',
                        type: 'integer'
                    },
                    {
                        name: 'published_date',
                        type: 'varchar'
                    },
                    {
                        name: 'numberof_reads',
                        type: 'integer'
                    },
                    {
                        name: 'average_rating',
                        type: 'decimal'
                    },
                    {
                        name: 'likes',
                        type: 'integer'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('books')
    }
}
