import googleBooksResponseFixture from '../../../test/fixtures/googlebooks.json'
import * as HTTPUtil from '../../util/request'
import { GoogleBooks } from '../googleBooks'

jest.mock('@src/util/request')

describe('GoogleBooks service', () => {
    const MockedRequestClass = HTTPUtil.Request as jest.Mocked<typeof HTTPUtil.Request>
    const mockedRequest = new HTTPUtil.Request() as jest.Mocked<HTTPUtil.Request>
    it('Should return the books data', async () => {
        const title = 'crime'

        mockedRequest.get.mockResolvedValue({ data: googleBooksResponseFixture } as HTTPUtil.Response)

        const googleBooks = new GoogleBooks(mockedRequest)

        const response = await googleBooks.fetchBooks(title)
        expect(response).toEqual(googleBooksResponseFixture)
    })

    it('Should return an error if it fails to reach the GoogleBooks service', async () => {
        const title = 'crime'

        mockedRequest.get.mockRejectedValue({ message: 'Network Error' })

        const googleBooks = new GoogleBooks(mockedRequest)

        await expect(googleBooks.fetchBooks(title)).rejects.toThrow('Unexpected error when trying to communicate to GoogleBooks: Network Error')
    })

    it('Should return an GoogleBooks error when the service responds with error', async () => {
        const title = 'crime'

        MockedRequestClass.isRequestError.mockReturnValue(true)
        mockedRequest.get.mockRejectedValue({
            response: {
                status: 429,
                data: { errors: ['Rate Limit reached'] }
            }
        })

        const googleBooks = new GoogleBooks(mockedRequest)

        await expect(googleBooks.fetchBooks(title)).rejects.toThrow('Unexpected error when trying to communicate to GoogleBooks: Error: {"errors":["Rate Limit reached"]} Code: 429')
    })

    it('Should return an error if no book is found', async () => {
        const title = 'sddasd2213'

        MockedRequestClass.isRequestError.mockReturnValue(true)
        mockedRequest.get.mockRejectedValue({
            response: {
                status: 400,
                data: { errors: ['No Book found'] }
            }
        })

        const googleBooks = new GoogleBooks(mockedRequest)

        await expect(googleBooks.fetchBooks(title)).rejects.toThrow('Unexpected error when trying to communicate to GoogleBooks: Error: {"errors":["No Book found"]} Code: 400')
    })
})
