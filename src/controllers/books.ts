import { Router, Request, Response } from 'express'

const booksRouter = Router()

booksRouter.get('/', (req: Request, res: Response) => {
    res.send({
        kind: 'books#volume',
        id: 'U5NhxE67JjMC',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/U5NhxE67JjMC',
        volumeInfo: {
            title: 'Crime and Punishment',
            authors: [
                'Fyodor Dostoevsky'
            ],
            publisher: 'Vintage',
            publishedDate: '2012-08-08',
            description: "Nominated as one of America’s best-loved novels by PBS’s The Great American Read With the same suppleness, energy, and range of voices that won their translation of The Brothers Karamazov the PEN/Book-of-the-Month Club Prize, Pevear and Volokhonsky offer a brilliant translation of Dostoevsky's classic novel that presents a clear insight into this astounding psychological thriller. \"The best (translation) currently available\"--Washington Post Book World.",
            pageCount: 592,
            printType: 'BOOK',
            categories: [
                'Fiction'
            ],
            imageLinks: {
                smallThumbnail: 'http://books.google.com/books/content?id=U5NhxE67JjMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                thumbnail: 'http://books.google.com/books/content?id=U5NhxE67JjMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
            },
            language: 'en',
            previewLink: 'http://books.google.com.br/books?id=U5NhxE67JjMC&printsec=frontcover&dq=crime&hl=&cd=1&source=gbs_api',
            infoLink: 'https://play.google.com/store/books/details?id=U5NhxE67JjMC&source=gbs_api',
            canonicalVolumeLink: 'https://play.google.com/store/books/details?id=U5NhxE67JjMC'
        },
        saleInfo: {
            country: 'BR',
            saleability: 'FOR_SALE',
            isEbook: true,
            listPrice: {
                amount: 76.95,
                currencyCode: 'BRL'
            },
            retailPrice: {
                amount: 76.95,
                currencyCode: 'BRL'
            },
            buyLink: 'https://play.google.com/store/books/details?id=U5NhxE67JjMC&rdid=book-U5NhxE67JjMC&rdot=1&source=gbs_api'
        },
        accessInfo: {
            country: 'BR',
            viewability: 'PARTIAL',
            embeddable: true,
            publicDomain: false,
            textToSpeechPermission: 'ALLOWED_FOR_ACCESSIBILITY',
            webReaderLink: 'http://play.google.com/books/reader?id=U5NhxE67JjMC&hl=&printsec=frontcover&source=gbs_api'
        }
    })
})

export default booksRouter
