import { EntityRepository, Repository } from 'typeorm'
import { Book } from '../models/Book'

export interface BooksmartBook {
    id: string
    title: string
    authors: string[]
    description: string
    pageCount: number
    imageLink: string
    pageViews: number
    publishedDate: string
    numberOfReads: number
    averageRating: number
    likes: number
    reviews: Array<any>
}

@EntityRepository(Book)
export class BookRepository extends Repository<any> {
    public async saveBook(book: object, id: string): Promise<{}> {
        if (await this.findOne(id) !== undefined) {
            throw new Error('Book already exists')
        }
        await this.save(book)
        return book
    }

    public async findById(id: string): Promise<BooksmartBook> {
        const result: BooksmartBook = await this.findOne(id)
        if (result === undefined) {
            throw new Error('Book not found')
        }
        return result
    }
}
