import { Users } from '../models/Users'
import { EntityRepository, Repository } from 'typeorm'
import { BookSmartUser } from '../services/users'

@EntityRepository(Users)
export class UsersRepository extends Repository<any> {
    public async saveUser(user: object, email: string): Promise<any> {
        if (await this.findOne(email) !== undefined) {
            throw new Error()
        }

        await this.save(user)
        return user
    }

    public async findUser(email: string): Promise<BookSmartUser> {
        const user: BookSmartUser = await this.findOne({ where: { email: email } })
        return user
    }

    public async updateUser(user: object): Promise<any> {
        await this.save(user)
    }
}
