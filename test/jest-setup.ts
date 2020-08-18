import app from '../src/app'
import supertest from 'supertest'
import connection from '../src/database/connection'
import { getRepository } from 'typeorm'
import { Book } from '../src/models/Book'

beforeAll(async () => {
    global.testRequest = supertest(app)
    await connection.create()
})

afterAll(async () => {
    const repository = getRepository(Book)
    await repository.delete({})
    await connection.close()
})
