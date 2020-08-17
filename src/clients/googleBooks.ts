import * as HTTUtil from '../util/request'
import { InternalError } from '../util/errors/internal-errors'
import config, { IConfig } from 'config'

export interface GoogleBooksApiResponse {
    kind: string,
    id: string,
    etag: string,
    selfLink: string,
    volumeInfo: { title: string, authors: string[], publishedDate: string, description: string, pageCount: number, imageLinks: { smallThumbnail?: string, thumbnail: string } },
    saleInfo: Object,
    accessInfo: Object,
    searchInfo: Object
}

export interface Books {
    items: GoogleBooksApiResponse[]
}

export class ClientRequestError extends InternalError {
    constructor(message: string) {
        const internalMessage = 'Unexpected error when trying to communicate to GoogleBooks'
        super(`${internalMessage}: ${message}`)
    }
}

export class GoogleBooksResponseError extends InternalError {
    constructor(message: string) {
        const internalMessage = 'Unexpected error when trying to communicate to GoogleBooks'
        super(`${internalMessage}: ${message}`)
    }
}

const googleApiResourceConfig: IConfig = config.get('App.resources.GoogleBooks')

export class GoogleBooks {
    constructor(protected request = new HTTUtil.Request()) { }

    public async fetchBooks(query: string): Promise<Books> {
        try {
            const response = await this.request.get<Books>(`${googleApiResourceConfig.get('apiUrl')}/volumes?q=${query}`)

            return response.data
        } catch (err) {
            if (HTTUtil.Request.isRequestError(err)) {
                throw new GoogleBooksResponseError(`Error: ${JSON.stringify(err.response.data)} Code: ${
                    err.response.status}`)
            }
            throw new ClientRequestError(err.message)
        }
    }
}
