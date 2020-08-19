import { Users } from '../models/Users'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Users)
export class UsersRepository extends Repository<any> {
    public async saveUser(user: object, email: string): Promise<any> {
        if (await this.findOne(email) !== undefined) {
            throw new Error()
        }

        await this.save(user)
        return user
    }

    public async findUser(email: string): Promise<any> {
        const user = await this.findOne({ where: { email: email } })
        return user
    }
}
