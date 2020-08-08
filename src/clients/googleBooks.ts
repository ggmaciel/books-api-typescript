import { AxiosStatic } from 'axios'
import { InternalError } from '@src/util/errors/internal-errors'

export interface GoogleBooksApiResponse {
    readonly kind: string,
    readonly id: string,
    readonly etag: string,
    readonly selfLink: string,
    readonly volumeInfo: { title: string, authors: string[], publisher: string, publishedDate: string, description: string, industryIdentifiers: [{ type: string, identifier: string }], readingModes: { text: boolean, image: boolean }, pageCount: number, printType: string, categories: string[], averageRating: number, ratingsCount: number, maturityRating: string, allowAnonLogging: string, contentVersion: string, panelizationSummary: { containsEpubBubbles: boolean, containsImageBubbles: boolean }, imageLinks: { smallThumbnail: string, thumbnail: string }, language: string, previewLink: string, infoLink: string, canonicalVolumeLink: string },
    readonly saleInfo: { country: string, saleability: string, isEbook: boolean, listPrice: { amount: number, currencyCode: string }, retailPrice: { amount: number, currencyCode: string }, buyLink: string, offers: [{ finskyOfferType: number, listPrice: { amount: number, currencyCode: string }, retailPrice: { amount: number, currencyCode: string }, giftable: boolean }] },
    readonly acessInfo: { country: string, viewability: string, embeddable: boolean, publicDomain: boolean, textToSpeechPermission: string, epub: { isAvailable: boolean, acsTokenLink: string }, pdf: { isAvailable: boolean, /* check here if error appears */ acsTokenLink: string }, webReaderLink: string, accessViewStatus: string, quoteSharingAllowed: boolean },
    readonly searchInfo: { textSnippet: string }
}

export class ClientRequestError extends InternalError {
    constructor(message: string) {
        const internalMessage = 'Unexpected error when trying to communicate with GoogleBooks'
        super(`${internalMessage}: ${message}`)
    }
}

export class GoogleBooksResponseError extends InternalError {
    constructor(message: string) {
        const internalMessage = 'Unexpected error returned by the GoogleBooks service'
        super(`${internalMessage}: ${message}`)
    }
}

export class GoogleBooks {
    constructor(protected request: AxiosStatic) { }
    public async fetchBooks(title: string): Promise<GoogleBooksApiResponse> {
        try {
            const response = await this.request.get(`https://www.googleapis.com/books/v1/volumes?q=${title}`,
                {
                    headers: {
                        Authorization: 'fake-token'
                    }
                })

            return response.data
        } catch (err) {
            if (err.response && err.response.status) {
                throw new GoogleBooksResponseError(`Error: ${JSON.stringify(err.response.data)} Code: ${err.response.status}`)
            }
            throw new ClientRequestError(err.message)
        }
    }
}
