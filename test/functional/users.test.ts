describe('Users functional tests', () => {
    describe('When creating a new user', () => {
        it('Should successfully create a new user', async () => {
            const newUser = {
                name: 'John Doe',
                email: 'john@email.com',
                password: '1234',
                booksRead: [],
                readList: [],
                favourites: []
            }

            const response = await global.testRequest.post('/users').send(newUser)

            expect(response.status).toBe(201)
            expect(response.body).toEqual(expect.objectContaining(newUser))
        })
    })
})
