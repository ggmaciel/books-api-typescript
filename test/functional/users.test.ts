import AuthService from '../../src/services/auth'

describe('Users functional tests', () => {
    describe('When creating a new user', () => {
        it('Should successfully create a new user with encrypted password', async () => {
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
            await expect(AuthService.comparePassword(newUser.password, response.body.password)).resolves.toBeTruthy()
            expect(response.body).toEqual(expect.objectContaining({ ...newUser, ...{ password: expect.any(String) } }))
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

        it('Should return an error if there is a validation error', async () => {
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
    describe('When authenticating a user', () => {
        it('Should generate a token for a valid user', async () => {
            const newUser = {
                email: 'john@email.com',
                password: '1234'
            }

            const response = await global.testRequest.post('/users/authenticate').send({ email: newUser.email, password: newUser.password })

            expect(response.body).toEqual(expect.objectContaining({ token: expect.any(String) }))
        })

        it('Should return an error if there is an auth validation error', async () => {
            const newUser = {
                password: '1234'
            }

            const response = await global.testRequest.post('/users/authenticate').send({ password: newUser.password })

            expect(response.status).toBe(422)
            expect(response.body).toEqual({
                code: 422,
                error: 'All fields are required'
            })
        })

        it('Should return an auth error if user does not exists', async () => {
            const newUser = {
                email: 'johny@email.com',
                password: '1234'
            }

            const response = await global.testRequest.post('/users/authenticate').send({ email: newUser.email, password: newUser.password })

            expect(response.status).toBe(400)
            expect(response.body).toEqual({ code: 400, error: 'Unexpected error during the user processing: User not found' })
        })

        it('Should return an auth error if the password is wrong', async () => {
            const newUser = {
                email: 'john@email.com',
                password: '123'
            }

            const response = await global.testRequest.post('/users/authenticate').send({ email: newUser.email, password: newUser.password })

            expect(response.status).toBe(400)
            expect(response.body).toEqual({ code: 400, error: 'Unexpected error during the user processing: Wrong password' })
        })
    })
})
