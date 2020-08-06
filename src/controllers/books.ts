import { Router, Request, Response } from 'express'

const booksRouter = Router()

booksRouter.get('/', (req: Request, res: Response) => {
    res.send({
        kind: 'books#volume',
        id: 'pDsFCAAAQBAJ',
        etag: 'l1v3USua8Cc',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/pDsFCAAAQBAJ',
        volumeInfo: {
            title: 'Code Complete',
            authors: [
                'Steve McConnell'
            ]
        }
    })
})

export default booksRouter
