import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async createUser(userId: string, avatar: string, loginStrategy: string): Promise<User> {
        const user = this.create({
            userId,
            avatar,
            loginStrategy
        });

        return await this.save(user);
    }

}
