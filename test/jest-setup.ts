import app from '../src/app'
import supertest from 'supertest'

beforeAll(() => {
    global.testRequest = supertest(app)
})
