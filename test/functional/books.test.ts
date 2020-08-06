describe('Books functional tests', () => {
    it('Should return a book with just a few times', async () => {
        const { body, status } = await global.testRequest.get('/books')

        expect(status).toBe(200)
        expect(body).toEqual({
            kind: 'books#volume',
            id: 'pDsFCAAAQBAJ',
            etag: 'l1v3USua8Cc',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/pDsFCAAAQBAJ',
            volumeInfo: {
                title: 'Code Complete',
                authors: [
                    'Steve McConnell'
                ]
            }
        })
    })
})
