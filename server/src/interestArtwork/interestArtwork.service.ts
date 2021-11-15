import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InterestArtworkRepository } from './interestArtwork.repository';
import { User } from '../user/user.entity';
import { InterestRequestDTO } from '../artwork/dto/artworkDTOs';
import { ArtworkRepository } from '../artwork/artwork.repository';

@Injectable()
export class InterestArtworkService {
    constructor(
        @InjectRepository(InterestArtworkRepository)
        private readonly interestArtworkRepository: InterestArtworkRepository,
        @InjectRepository(ArtworkRepository)
        private readonly artworkRepository: ArtworkRepository
    ) {}

    async insertInterestArtwork(user: User, interestRequestDTO: InterestRequestDTO): Promise<boolean> {
        try {
            const { artworkId, isInterest } = interestRequestDTO;
            const artwork = await this.artworkRepository.findOne(artworkId);

            isInterest === 'true'
                ? await this.interestArtworkRepository.insertInterestArtwork(user, artwork)
                : await this.interestArtworkRepository.deleteInterestArtwork(user, artwork);

            return true;
        } catch(err) {
            return false;
        }
    }
}
