import { Router, Request, Response } from 'express'

const booksRouter = Router()

booksRouter.post('/', (req: Request, res: Response) => {
    res.status(201).send(req.body)
})

export default booksRouter
