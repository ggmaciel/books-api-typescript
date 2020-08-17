import { EntityRepository, Repository } from 'typeorm'
import { Book } from '../models/Book'

@EntityRepository(Book)
export class BookRepository extends Repository<any> {
    public async saveBook(book: object, id: string): Promise<{}> {
        if (await this.findOne(id) !== undefined) {
            return 'Book already exists'
        }
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
