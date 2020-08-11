import { GoogleBooks } from '@src/clients/googleBooks'
import googlebooks from '@test/fixtures/googlebooks.json'
import { BookSmart } from '../booksmart'

jest.mock('@src/clients/googleBooks')

describe('Booksmart service', () => {
    it('Should return the Booksmart for one added book', async () => {
        GoogleBooks.prototype.fetchBooks = jest.fn().mockResolvedValue(googlebooks)

        const id = 'U5NhxE67JjMC'

        const expectedResponse = [{
            id: 'U5NhxE67JjMC',
            title: 'Crime and Punishment',
            authors: ['Fyodor Dostoevsky'],
            description: "Nominated as one of America’s best-loved novels by PBS’s The Great American Read With the same suppleness, energy, and range of voices that won their translation of The Brothers Karamazov the PEN/Book-of-the-Month Club Prize, Pevear and Volokhonsky offer a brilliant translation of Dostoevsky's classic novel that presents a clear insight into this astounding psychological thriller. \"The best (translation) currently available\"--Washington Post Book World.",
            pageCount: 592,
            imageLinks: {
                smallThumbnail: 'http://books.google.com/books/content?id=U5NhxE67JjMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                thumbnail: 'http://books.google.com/books/content?id=U5NhxE67JjMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
            },
            pageViews: 0,
            publishedDate: '2012-08-08',
            numberOfReads: 0,
            averageRating: 1,
            likes: 0,
            reviews: [{ name: 'Gustavo', reviewBody: 'Nice book' }]
        }]

        const newBook = new BookSmart(new GoogleBooks())
        const bookSmart = await newBook.processBook(id)
        expect(bookSmart).toEqual(expectedResponse)
    })
})
