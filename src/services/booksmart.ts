import { GoogleBooks } from '@src/clients/googleBooks'
import { InternalError } from '@src/util/errors/internal-errors'

export class BookSmartProcessingInternalError extends InternalError {
    constructor(message: string) {
        super(`Unexpected error during the book processing: ${message}`)
    }
}

export class BookSmart {
    constructor(protected googleBooks = new GoogleBooks()) { }

    public async processBook(id: string): Promise<{}> {
        try {
            const googleBook = await this.googleBooks.fetchBooks(id)

            const enrichedBookData = googleBook.items.map((e) => ({
                id: e.id,
                title: e.volumeInfo.title,
                authors: e.volumeInfo.authors,
                description: e.volumeInfo.description,
                pageCount: e.volumeInfo.pageCount,
                imageLink: e.volumeInfo.imageLinks.thumbnail,
                pageViews: 0,
                publishedDate: e.volumeInfo.publishedDate,
                numberOfReads: 0,
                averageRating: 1,
                likes: 0,
                reviews: [{ name: 'Gustavo', reviewBody: 'Nice book' }]
            }))

            return enrichedBookData
        } catch (err) {
            throw new BookSmartProcessingInternalError(err.message)
        }
    }
}
