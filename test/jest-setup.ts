import app from '../src/app'
import supertest from 'supertest'
import connection from '@src/database/connection'

beforeAll(async () => {
    global.testRequest = supertest(app)
    await connection.create()
})

afterAll(async () => {
    await connection.close()
})
