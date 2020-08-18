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

            const response = await global.testRequest.post('/users').send({ name: newUser.name, email: newUser.email, password: newUser.password })

            expect(response.status).toBe(201)
            expect(response.body).toEqual(expect.objectContaining(newUser))
        })

        it('Should return error if user already exists', async () => {
            const newUser = {
                name: 'John Doe',
                email: 'john@email.com',
                password: '1234'
            }

            const response = await global.testRequest.post('/users').send({ name: newUser.name, email: newUser.email, password: newUser.password })

            expect(response.status).toBe(409)
            expect(response.body).toEqual({
                code: 409,
                error: 'Unexpected error during the user processing: User already exists'
            })
        })

        it('Shoul return an error if there is a validation error', async () => {
            const newUser = {
                email: 'john@email.com',
                password: '1234'
            }

            const response = await global.testRequest.post('/users').send({ email: newUser.email, password: newUser.password })

            expect(response.status).toBe(422)
            expect(response.body).toEqual({
                code: 422,
                error: 'All fields are required'
            })
        })
    })
})
