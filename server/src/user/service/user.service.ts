import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user.repository';
import { ArtworkRepository } from '../../artwork/artwork.repository';
import { Artwork } from '../../artwork/artwork.entity';
import { User } from '../user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        @InjectRepository(ArtworkRepository)
        private artworkRepository: ArtworkRepository
    ) {}

    getAllUsersArtworks(userId: number): Promise<Artwork[]> {
        return this.artworkRepository.getAllUsersArtworks(userId);
    }

    async checkRegisteredUser(userId: string, loginStrategy: string): Promise<User> {
        let user = await this.userRepository.findOne({ userId, loginStrategy });

        if(!user) {
            user = await this.userRepository.createUser(userId, loginStrategy);
        }

        return user;
    }

    async updateUserToken(id: number, refreshToken: string): Promise<void> {
        await this.userRepository.update(id, { refreshToken });
    }

}
