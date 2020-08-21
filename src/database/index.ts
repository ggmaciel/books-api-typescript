import { createConnection } from 'typeorm'

createConnection({
    type: 'postgres',
    url: 'postgres://postgres:docker@localhost:5433/booksmart'
})
