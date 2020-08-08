import { GoogleBooks } from '@src/clients/googleBooks'
import axios from 'axios'
import googleBooksFixture from '@test/fixtures/googlebooks.json'

jest.mock('axios')

describe('Google Books client', () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>
    it('Should return the normalized book from the Google Books service', async () => {
        const title = 'crime'

        mockedAxios.get.mockResolvedValue({ data: googleBooksFixture })

        const googleBooks = new GoogleBooks(mockedAxios)

        const response = await googleBooks.fetchBooks(title)
        expect(response).toEqual(googleBooksFixture)
    })

    it('Should get a generic error from GoogleBooks service when the request fail before reaching the service', async () => {
        const title = 'crime'

        mockedAxios.get.mockRejectedValue({ message: 'Network Error' })

        const googleBooks = new GoogleBooks(mockedAxios)

        await expect(googleBooks.fetchBooks(title)).rejects.toThrow(
            'Unexpected error when trying to communicate with GoogleBooks: Network Error'
        )
    })

    it('Should get an GoogleBooksResponseError when the GoogleBooks service responds with error', async () => {
        const title = 'crime'

        mockedAxios.get.mockRejectedValue({
            response: {
                status: 429,
                data: { errors: ['Rate Limit reached'] }
            }
        })

        const googleBooks = new GoogleBooks(mockedAxios)

        await expect(googleBooks.fetchBooks(title)).rejects.toThrow(
            'Unexpected error returned by the GoogleBooks service: Error: {"errors":["Rate Limit reached"]} Code: 429'
        )
    })
})
