import { GoogleBooks } from '../../clients/googleBooks'
import googlebooks from '../../../test/fixtures/googlebooks.json'
import { BookSmart, BookSmartProcessingInternalError } from '../booksmart'

jest.mock('@src/clients/googleBooks')

describe('Booksmart service', () => {
    const mockedGoogleBooksService = new GoogleBooks() as jest.Mocked<GoogleBooks>
    it('Should return the Booksmart for one added book', async () => {
        mockedGoogleBooksService.fetchBooks.mockResolvedValue(googlebooks)

        const id = 'U5NhxE67JjMC'

        const expectedResponse = [{
            id: 'U5NhxE67JjMC',
            title: 'Crime and Punishment',
            authors: ['Fyodor Dostoevsky'],
            description: "Nominated as one of America’s best-loved novels by PBS’s The Great American Read With the same suppleness, energy, and range of voices that won their translation of The Brothers Karamazov the PEN/Book-of-the-Month Club Prize, Pevear and Volokhonsky offer a brilliant translation of Dostoevsky's classic novel that presents a clear insight into this astounding psychological thriller. \"The best (translation) currently available\"--Washington Post Book World.",
            pageCount: 592,
            imageLink: 'http://books.google.com/books/content?id=U5NhxE67JjMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
            pageViews: 0,
            publishedDate: '2012-08-08',
            numberOfReads: 0,
            averageRating: 1,
            likes: 0,
            reviews: []
        }]

        const newBook = new BookSmart(mockedGoogleBooksService)
        const bookSmart = await newBook.processBook(id)
        expect(bookSmart).toEqual(expectedResponse)
    })

    it('Should throw internal processing error when something goes wrong during the rating process', async () => {
        const id = 'U5NhxE67JjMC'

        mockedGoogleBooksService.fetchBooks.mockRejectedValue('Error fetching data')

        const bookSmart = new BookSmart(mockedGoogleBooksService)

        await expect(bookSmart.processBook(id)).rejects.toThrow(BookSmartProcessingInternalError)
    })
})
