import { GoogleBooks } from '@src/clients/googleBooks'

export class BookSmart {
    constructor(protected googleBooks = new GoogleBooks()) { }

    public async processBook(id: string): Promise<{}> {
        const googleBook = await this.googleBooks.fetchBooks(id)

        const enrichedBookData = googleBook.items.map((e) => ({
            id: e.id,
            title: e.volumeInfo.title,
            authors: e.volumeInfo.authors,
            description: e.volumeInfo.description,
            pageCount: e.volumeInfo.pageCount,
            imageLinks: e.volumeInfo.imageLinks,
            pageViews: 0,
            publishedDate: e.volumeInfo.publishedDate,
            numberOfReads: 0,
            averageRating: 1,
            likes: 0,
            reviews: [{ name: 'Gustavo', reviewBody: 'Nice book' }]
        }))

        return enrichedBookData
    }
}
