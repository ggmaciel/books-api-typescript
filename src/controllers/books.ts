import { Router, Request, Response } from 'express'
import { Book } from '../models/Book'
import { getRepository } from 'typeorm'

const booksRouter = Router()

booksRouter.post('/', async (req: Request, res: Response) => {
    try {
        const book: Book = req.body
        const repository = getRepository(Book)

        const result = await repository.save(book)
        res.status(201).send(result)
    } catch (err) {
        res.status(500).send({ error: 'Book validation error: Field missing' })
    }
})

export default booksRouter
