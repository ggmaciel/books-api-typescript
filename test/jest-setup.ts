import app from '../src/app'
import supertest from 'supertest'
import { createConnection } from 'typeorm'

beforeAll(() => {
    global.testRequest = supertest(app)
})

afterAll(async () => {
    await createConnection().then(async connection => {
        await connection.close()
    })
})
