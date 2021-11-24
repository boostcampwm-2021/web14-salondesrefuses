import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    createUser(userId: string, name: string, avatar: string, loginStrategy: string): Promise<User> {
        const user = this.create({
            userId,
            name,
            avatar,
            loginStrategy,
        });

        return this.save(user);
    }

}
