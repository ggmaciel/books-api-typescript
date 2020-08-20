import { Router, Request, Response } from 'express'
import { BookSmart } from '../services/booksmart'

const booksRouter = Router()
const booksmart = new BookSmart()

booksRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id: string = req.body.id

        const result = await booksmart.processBook(id)

        res.status(201).send(result)
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
})

booksRouter.get('/', async (req: Request, res: Response) => {
    try {
        const id = req.body.id

        const result = await booksmart.getProcessedBook(id)

        res.status(200).json(result)
    } catch (err) {
        res.status(404).send({ error: err.message })
    }
})

export default booksRouter
