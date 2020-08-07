import { GoogleBooks } from '@src/clients/googleBooks'
import axios from 'axios'
import googleBooksFixture from '@test/fixtures/googlebooks.json'
import googleBooksNormalizedFixture from '@test/fixtures/googlebooks_normalized.json'

jest.mock('axios')

describe('Google Books client', () => {
    it('Should return the normalized book from the Google Books service', async () => {
        const title = 'crime'

        axios.get = jest.fn().mockResolvedValue(googleBooksFixture)

        const googleBooks = new GoogleBooks(axios)
        const response = await googleBooks.fetchBooks(title)

        expect(response).toEqual(googleBooksNormalizedFixture)
    })
})
