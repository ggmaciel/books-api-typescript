import { Router, Request, Response } from 'express'
import { Users } from '../services/users'
import { authMiddleware } from '../middlewares/auth'

const usersRouter = Router()
const users = new Users()

usersRouter.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            res.status(422).send({ code: 422, error: 'All fields are required' })
        } else {
            const response = await users.createNewUser(name, email, password)

            res.status(201).send(response)
        }
    } catch (err) {
        res.status(409).send({ code: 409, error: err.message })
    }
})

usersRouter.post('/authenticate', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(422).send({ code: 422, error: 'All fields are required' })
        } else {
            const authenticatedUser = await users.getUser(email, password)
            res.status(200).send({ token: authenticatedUser.token, user: authenticatedUser.user })
        }
    } catch (err) {
        res.status(400).send({ code: 400, error: err.message })
    }
})

usersRouter.put('/authenticate/read', authMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, title, image } = req.body

        if (!id || !title || !image) {
            res.status(422).send({ code: 422, error: 'All fields are required' })
        } else {
            const email = req.decoded?.payload.email

            const result = await users.addBookToReadList(id, title, image, email as string)
            res.status(200).send({ booksRead: result })
        }
    } catch (err) {
        res.status(400).send({ code: 400, error: err.message })
    }
})

export default usersRouter
