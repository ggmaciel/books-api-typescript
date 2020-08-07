describe('Books functional tests', () => {
    it('Should return a book with just a few times', async () => {
        const { body, status } = await global.testRequest.get('/books')

        expect(status).toBe(200)
        expect(body).toEqual({
            kind: 'books#volume',
            id: 'BMusAgAAQBAJ',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/BMusAgAAQBAJ',
            volumeInfo: {
                title: 'Human Security, Transnational Crime and Human Trafficking',
                subtitle: 'Asian and Western Perspectives',
                authors: [
                    'Shiro Okubo',
                    'Louise Shelley'
                ],
                publisher: 'Routledge',
                publishedDate: '2011-03-17',
                description: 'In recent years, drug use, illegal migration and human trafficking have all become more common in Asia, North America and Asia: the problems of organized crime and human trafficking are no longer confined to operating at the traditional regional level. This book fills a gap in the current literature by examining transnational crime, human trafficking and its implications for human security from both Western and Asian perspectives. The book: Provides an outline of the overall picture of organized crime and human trafficking in the contemporary world, examining the current trends and recent developments contrasts the experience and perception of these problems in Asia with those in the West, by analyzing the distinctive Japanese perspective on globalization, human security and transnational crime examines the policy responses of key states and international institutions in Germany, Canada, the United States, the European Union, Japan, and Korea. This book argues that any effort to combat these crimes requires a response that addresses the welfare of human beings alongside the standard criminal law response. It represents a timely analysis of the increasingly serious problems of transnational crime, human trafficking and security.',
                pageCount: 272,
                categories: [
                    'Social Science'
                ],
                imageLinks: {
                    smallThumbnail: 'http://books.google.com/books/content?id=BMusAgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                    thumbnail: 'http://books.google.com/books/content?id=BMusAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
                },
                language: 'en',
                previewLink: 'http://books.google.com.br/books?id=BMusAgAAQBAJ&pg=PT97&dq=crime+intitle&hl=&cd=1&source=gbs_api',
                infoLink: 'https://play.google.com/store/books/details?id=BMusAgAAQBAJ&source=gbs_api',
                canonicalVolumeLink: 'https://play.google.com/store/books/details?id=BMusAgAAQBAJ'
            },
            saleInfo: {
                country: 'BR',
                saleability: 'FOR_SALE',
                isEbook: true,
                listPrice: {
                    amount: 245.35,
                    currencyCode: 'BRL'
                },
                retailPrice: {
                    amount: 245.35,
                    currencyCode: 'BRL'
                },
                buyLink: 'https://play.google.com/store/books/details?id=BMusAgAAQBAJ&rdid=book-BMusAgAAQBAJ&rdot=1&source=gbs_api'
            },
            accessInfo: {
                country: 'BR',
                viewability: 'PARTIAL',
                embeddable: true,
                publicDomain: false,
                textToSpeechPermission: 'ALLOWED',
                webReaderLink: 'http://play.google.com/books/reader?id=BMusAgAAQBAJ&hl=&printsec=frontcover&source=gbs_api',
                accessViewStatus: 'SAMPLE',
                quoteSharingAllowed: false
            }
        })
    })
})
