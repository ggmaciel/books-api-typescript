import googleBooksResponseFixture from '@test/fixtures/googlebooks.json'
import axios from 'axios'
import { GoogleBooks } from '../googleBooks'

jest.mock('axios')

describe('GoogleBooks service', () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>
    it('Should return the books data', async () => {
        const title = 'crime'

        mockedAxios.get.mockResolvedValue({ data: googleBooksResponseFixture })

        const googleBooks = new GoogleBooks(mockedAxios)

        const response = await googleBooks.fetchBooks(title)
        expect(response).toEqual(googleBooksResponseFixture)
    })

    it('Should return an error it fails to reach the service', async () => {
        const title = 'crime'

        mockedAxios.get.mockRejectedValue({ message: 'Network Error' })

        const googleBooks = new GoogleBooks(mockedAxios)

        await expect(googleBooks.fetchBooks(title)).rejects.toThrow('Unexpected error when trying to communicate to GoogleBooks: Network Error')
    })

    it('Should return an GoogleBooks error when the service responds with error', async () => {
        const title = 'crime'

        mockedAxios.get.mockRejectedValue({
            response: {
                status: 429,
                data: { errors: ['Rate Limit reached'] }
            }
        })

        const googleBooks = new GoogleBooks(mockedAxios)

        await expect(googleBooks.fetchBooks(title)).rejects.toThrow('Unexpected error when trying to communicate to GoogleBooks: Error: {"errors":["Rate Limit reached"]} Code: 429')
    })
})
