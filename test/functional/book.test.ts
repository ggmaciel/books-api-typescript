describe('Books functional tests', () => {
    describe('When creating a book', () => {
        it('Should create a book with success', async () => {
            const newBook = {
                id: 'w0ZFAAAAYAAJ',
                title: 'Diario das cortes geraes e extraordinarias da nacão portugueza: August 1, 1822-September 30, 1822',
                authors: [
                    'Portugal. Cortes'
                ],
                description: '',
                pageCount: 0,
                imageLink: 'http://books.google.com/books/content?id=w0ZFAAAAYAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
                pageViews: 0,
                publishedDate: '1822',
                numberOfReads: 0,
                averageRating: 1,
                likes: 0,
                reviews: []
            }

            const response = await global.testRequest.post('/books').send({ id: newBook.id })

            expect(response.status).toBe(201)
            expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining(newBook)]))
        })

        it('Should get a book by id with success', async () => {
            const book = {
                id: 'w0ZFAAAAYAAJ',
                title: 'Diario das cortes geraes e extraordinarias da nacão portugueza: August 1, 1822-September 30, 1822',
                authors: [
                    'Portugal. Cortes'
                ],
                description: '',
                pageCount: 0,
                imageLink: 'http://books.google.com/books/content?id=w0ZFAAAAYAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
                pageViews: 0,
                publishedDate: '1822',
                numberOfReads: 0,
                averageRating: 1,
                likes: 0,
                reviews: []
            }

            const response = await global.testRequest.get('/books').send({ id: book.id })

            expect(response.status).toBe(200)
            expect(response.body).toEqual(book)
        })

        it('Should return and error if id does not exist on database', async () => {
            const id = 'a'

            const response = await global.testRequest.get('/books').send({ id: id })

            expect(response.status).toBe(404)
            expect(response.body).toEqual({
                error: 'Unexpected error during the book processing: Book not found'
            })
        })
    })
})
