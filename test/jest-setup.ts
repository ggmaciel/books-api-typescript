import app from '../src/app'
import supertest from 'supertest'
import connection from '../src/database/connection'
import { getRepository } from 'typeorm'
import { Book } from '../src/models/Book'
import { Users } from '../src/models/Users'

beforeAll(async () => {
    global.testRequest = supertest(app)
    await connection.create()
})

afterAll(async () => {
    const repository = getRepository(Book)
    await repository.delete({})
    const repositoryUsers = getRepository(Users)
    await repositoryUsers.delete({})
    await connection.close()
})
