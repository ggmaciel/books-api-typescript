import { EntityRepository, Repository } from 'typeorm'
import { Book } from '@src/models/Book'

@EntityRepository(Book)
export class BookRepository extends Repository<any> {
    public async saveBook(book: object): Promise<{}> {
        await this.save(book)
        return book
    }

    public async findById(id: string): Promise<{}> {
        const result = await this.findOne(id)
        if (result === undefined) {
            throw new Error('Book not found')
        }
        return result
    }
}
