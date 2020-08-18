import { Router, Request, Response } from 'express'
import { Users } from '../services/users'

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

export default usersRouter
