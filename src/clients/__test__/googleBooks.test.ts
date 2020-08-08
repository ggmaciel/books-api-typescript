import { GoogleBooks } from '@src/clients/googleBooks'
import * as HTTPUtil from '@src/util/request'
import googleBooksFixture from '@test/fixtures/googlebooks.json'

jest.mock('@src/util/request')

describe('Google Books client', () => {
    const MockedRequestClass = HTTPUtil.Request as jest.Mocked<typeof HTTPUtil.Request>
    const mockedRequest = new HTTPUtil.Request() as jest.Mocked<HTTPUtil.Request>
    it('Should return the normalized book from the Google Books service', async () => {
        const title = 'crime'

        mockedRequest.get.mockResolvedValue({ data: googleBooksFixture } as HTTPUtil.Response)

        const googleBooks = new GoogleBooks(mockedRequest)

        const response = await googleBooks.fetchBooks(title)
        expect(response).toEqual(googleBooksFixture)
    })

    it('Should get a generic error from GoogleBooks service when the request fail before reaching the service', async () => {
        const title = 'crime'

        mockedRequest.get.mockRejectedValue({ message: 'Network Error' })

        const googleBooks = new GoogleBooks(mockedRequest)

        await expect(googleBooks.fetchBooks(title)).rejects.toThrow(
            'Unexpected error when trying to communicate with GoogleBooks: Network Error'
        )
    })

    it('Should get an GoogleBooksResponseError when the GoogleBooks service responds with error', async () => {
        const title = 'crime'

        MockedRequestClass.isRequestError.mockReturnValue(true)

        mockedRequest.get.mockRejectedValue({
            response: {
                status: 429,
                data: { errors: ['Rate Limit reached'] }
            }
        })

        const googleBooks = new GoogleBooks(mockedRequest)

        await expect(googleBooks.fetchBooks(title)).rejects.toThrow(
            'Unexpected error returned by the GoogleBooks service: Error: {"errors":["Rate Limit reached"]} Code: 429'
        )
    })
})
