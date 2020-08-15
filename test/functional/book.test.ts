import connection from '@src/database/connection'

describe('Books functional tests', () => {
    beforeAll(async () => {
        await connection.clear()
    })

    describe('When creating a book', () => {
        it('Should create a book with sucess', async () => {
            const newBook = {
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
                reviews: [{ name: 'Gustavo', reviewBody: 'Nice book' }]
            }

            const response = await global.testRequest.post('/books').send(newBook)

            expect(response.status).toBe(201)
            expect(response.body).toEqual(expect.objectContaining(newBook))
        })

        it('Should return 500 when there is an empty field', async () => {
            const newBook = {
                // Erased id
                title: 'Crime and Punishment',
                authors: ['Fyodor Dostoevsky'],
                description: "Nominated as one of America’s best-loved novels by PBS’s The Great American Read With the same suppleness, energy, and range of voices that won their translation of The Brothers Karamazov the PEN/Book-of-the-Month Club Prize, Pevear and Volokhonsky offer a brilliant translation of Dostoevsky's classic novel that presents a clear insight into this astounding psychological thriller. \"The best (translation) currently available\"--Washington Post Book World.",
                pageCount: '592',
                imageLink: 'http://books.google.com/books/content?id=U5NhxE67JjMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
                pageViews: 0,
                publishedDate: '2012-08-08',
                numberOfReads: 0,
                averageRating: 1,
                likes: 0,
                reviews: [{ name: 'Gustavo', reviewBody: 'Nice book' }]
            }

            const response = await global.testRequest.post('/books').send(newBook)

            expect(response.status).toBe(500)
            expect(response.body).toEqual({
                error: 'Book validation error: Field missing'
            })
        })
    })
})
