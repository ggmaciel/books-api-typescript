import { Router } from 'express'
import googleBooksRouter from './controllers/googlebooks'
import booksRouter from './controllers/books'

const routes = Router()

routes.use('/googlebooks', googleBooksRouter)
routes.use('/books', booksRouter)

export default routes
