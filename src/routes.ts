import { Router } from 'express'
import booksRouter from './controllers/books'

const routes = Router()

routes.use('/books', booksRouter)

export default routes
