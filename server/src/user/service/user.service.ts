import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user.repository';
import { ArtworkRepository } from '../../artwork/artwork.repository';
import { Artwork } from '../../artwork/artwork.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        @InjectRepository(ArtworkRepository)
        private artworkRepository: ArtworkRepository
    ) {}

    getAllArtWorks(userId: number): Promise<Artwork[]> {
        return this.artworkRepository.getAllArtWorks(userId);
    }

}
