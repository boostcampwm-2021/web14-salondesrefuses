import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async createUser(userId: string, loginStrategy: string): Promise<User> {
        const user = this.create({ userId, loginStrategy });

        return await this.save(user);
    }

}
