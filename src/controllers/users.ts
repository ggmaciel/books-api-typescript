import { Router, Request, Response } from 'express'

const usersRouter = Router()

usersRouter.post('/', async (req: Request, res: Response): Promise<void> => {
    const newUser = {
        name: 'John Doe',
        email: 'john@email.com',
        password: '1234',
        booksRead: [],
        readList: [],
        favourites: []
    }

    res.status(201).send(newUser)
})

export default usersRouter
