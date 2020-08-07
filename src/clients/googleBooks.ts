import { AxiosStatic } from 'axios'

export class GoogleBooks {
    constructor(protected request: AxiosStatic) { }
    public async fetchBooks(title: string): Promise<{}> {
        return this.request.get(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
    }
}
