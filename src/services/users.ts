import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepository'
import { v4 as uuidv4 } from 'uuid'
import { InternalError } from '../util/errors/internal-errors'
import AuthService from './auth'

export interface BookSmartUser {
    id: string,
    name: string,
    email: string,
    password: string,
    booksRead: ArraysBookSmart[]
    readList: ArraysBookSmart[]
    favourites: ArraysBookSmart[]
}

export interface ArraysBookSmart {
    id: string
    title: string
    image: string
}

export class UserProcessingInternalError extends InternalError {
    constructor(message: string) {
        super(`Unexpected error during the user processing: ${message}`)
    }
}

export class Users {
    public async createNewUser(name: string, email: string, password: string): Promise<any> {
        try {
            const repository = getCustomRepository(UsersRepository)

            const newUser: BookSmartUser = {
                id: uuidv4(),
                name: name,
                email: email,
                password: await AuthService.hashPassword(password),
                booksRead: [],
                readList: [],
                favourites: []
            }

            const result = await repository.saveUser(newUser, newUser.email)

            return result
        } catch (err) {
            throw new UserProcessingInternalError('User already exists')
        }
    }

    public async getUser(email: string, password: string): Promise<any> {
        try {
            const repository = getCustomRepository(UsersRepository)
            const user: BookSmartUser = await repository.findUser(email)
            if (!(await AuthService.comparePassword(password, user.password))) {
                throw new UserProcessingInternalError('Wrong password')
            } else {
                const token = AuthService.generateToken(user)
                const authUser = {
                    token,
                    user
                }
                return authUser
            }
        } catch (err) {
            if (err.message !== 'Unexpected error during the user processing: Wrong password') {
                throw new UserProcessingInternalError('User not found')
            }
            throw new UserProcessingInternalError('Wrong password')
        }
    }

    public async addBookToReadList(bookId: string, bookTitle: string, bookImage: string, email: string): Promise<any> {
        try {
            const userRepository = getCustomRepository(UsersRepository)

            const user = await userRepository.findUser(email)

            const listItem = {
                id: bookId,
                image: bookImage,
                title: bookTitle
            }

            const filterBooksRead = user.booksRead.filter(() => bookId)

            if (filterBooksRead.length > 0) {
                throw new Error()
            }

            user.booksRead.push(listItem)
            await userRepository.updateUser(user)

            // const filter = user.booksRead.some(value => value.id.includes(bookId))
            return listItem
        } catch (err) {
            throw new Error('Book already readed')
        }
    }
}
