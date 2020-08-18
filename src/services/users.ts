import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepository'
import { v4 as uuidv4 } from 'uuid'
import { InternalError } from '../util/errors/internal-errors'

export interface NewUser {
    id: string,
    name: string,
    email: string,
    password: string,
    booksRead: Array<Object>,
    readList: Array<Object>,
    favourites: Array<Object>
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

            const newUser: NewUser = {
                id: uuidv4(),
                name: name,
                email: email,
                password: password,
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
}
