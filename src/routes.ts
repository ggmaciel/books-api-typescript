import { Router } from 'express'
import booksRouter from './controllers/books'
import usersRouter from './controllers/users'

const routes = Router()

routes.use('/books', booksRouter)
routes.use('/users', usersRouter)

export default routes
