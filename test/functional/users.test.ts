import AuthService from '../../src/services/auth'

describe('Users functional tests', () => {
    const defaultUser = {
        name: 'John Doe',
        email: 'john@email.com',
        password: '1234',
        booksRead: [],
        readList: [],
        favourites: []
    }
    const token = AuthService.generateToken(defaultUser)
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
                id: '2331a',
                name: 'John Doe',
                email: 'john@email.com',
                password: '1234',
                booksRead: [],
                readList: [],
                favourites: []
            }

            const response = await global.testRequest.post('/users/authenticate').send({ email: newUser.email, password: newUser.password })

            expect(response.body).toEqual(expect.objectContaining({ token: expect.any(String) }))
            expect(response.body.user).toEqual(expect.objectContaining({ ...newUser, ...{ id: expect.any(String), password: expect.any(String) } }))
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

        it('Should add one book to the books read', async () => {
            const book = {
                id: 'w0ZFAAAAYAAJ',
                title: 'Diario das cortes geraes e extraordinarias da nacão portugueza: August 1, 1822-September 30, 1822',
                image: 'http://books.google.com/books/content?id=w0ZFAAAAYAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
            }

            await global.testRequest.post('/books').send({ id: book.id })
            const response = await global.testRequest.put('/users/authenticate/read').set({ 'x-access-token': token }).send({ id: book.id, title: book.title, image: book.image })

            expect(response.status).toBe(200)
            expect(response.body).toEqual(expect.objectContaining({ booksRead: book }))
        })

        it('Should return error if book already on books read list', async () => {
            const book = {
                id: 'w0ZFAAAAYAAJ',
                title: 'Diario das cortes geraes e extraordinarias da nacão portugueza: August 1, 1822-September 30, 1822',
                image: 'http://books.google.com/books/content?id=w0ZFAAAAYAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
            }

            await global.testRequest.post('/books').send({ id: book.id })
            const response = await global.testRequest.put('/users/authenticate/read').set({ 'x-access-token': token }).send({ id: book.id, title: book.title, image: book.image })

            expect(response.status).toBe(400)
            expect(response.body).toEqual({ code: 400, error: 'Book already readed' })
        })
    })
    describe('When getting user profile info', () => {
        it('Should return the token owner profile information', async () => {
            const newUser = {
                id: '2331a',
                name: 'John Doe',
                email: 'john@email.com',
                password: '1234',
                booksRead: [{
                    id: 'w0ZFAAAAYAAJ',
                    title: 'Diario das cortes geraes e extraordinarias da nacão portugueza: August 1, 1822-September 30, 1822',
                    image: 'http://books.google.com/books/content?id=w0ZFAAAAYAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
                }],
                readList: [],
                favourites: []
            }

            const token = AuthService.generateToken(newUser)
            const { body, status } = await global.testRequest.get('/users/me').set({ 'x-access-token': token })

            expect(status).toBe(200)
            expect(token).toEqual(expect.any(String))
            expect(body.user).toEqual(expect.objectContaining({ ...newUser, ...{ id: expect.any(String), password: expect.any(String), booksRead: expect.any(Array) } }))
        })

        it('Sould return Not Found, when the user is not found', async () => {
            const newUser = {
                id: '2331321321321a',
                name: 'John Doe',
                email: 'john+1@email.com',
                password: '1234',
                booksRead: [],
                readList: [],
                favourites: []
            }

            const token = AuthService.generateToken(newUser)

            const { body, status } = await global.testRequest.get('/users/me').set({ 'x-access-token': token })

            expect(status).toBe(404)
            expect(body.error).toBe('Unexpected error during the user processing: User not found')
        })

        it('Sould return Not Found, when the user is not sent to endpoint', async () => {
            const { body, status } = await global.testRequest.get('/users/me').set({ 'x-access-token': 'a' })
            expect(status).toBe(401)
            expect(body.error).toBe('jwt malformed')
        })
    })
})
