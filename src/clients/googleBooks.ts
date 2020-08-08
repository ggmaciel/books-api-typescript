import axios, { AxiosStatic } from 'axios'
import { InternalError } from '@src/util/errors/internal-errors'
import config, { IConfig } from 'config'

export interface GoogleBooksApiResponse {
    kind: string,
    id: string,
    etag: string,
    selfLink: string,
    volumeInfo: Object,
    saleInfo: Object,
    accessInfo: Object,
    searchInfo: Object
}

export interface Books {
    items: GoogleBooksApiResponse[]
}

export class GoogleApiUnexpectedError extends InternalError {
    constructor(message: string) {
        super(message)
    }
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
    constructor(protected request: AxiosStatic = axios) { }

    public async fetchBooks(query: string): Promise<Books[]> {
        try {
            const response = await this.request.get<Books[]>(`${googleApiResourceConfig.get('apiUrl')}/volumes?q=${query}`)
            return response.data
        } catch (err) {
            if (err.response && err.response.status) {
                throw new GoogleBooksResponseError(`Error: ${JSON.stringify(err.response.data)} Code: ${
                    err.response.status}`)
            }
            throw new ClientRequestError(err.message)
        }
    }
}
