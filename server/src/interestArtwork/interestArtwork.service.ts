import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InterestArtworkRepository } from './interestArtwork.repository';
import { User } from '../user/user.entity';
import { InterestRequestDTO } from '../artwork/dto/artwork.dto';
import { ArtworkRepository } from '../artwork/artwork.repository';

@Injectable()
export class InterestArtworkService {
    constructor(
        private readonly interestArtworkRepository: InterestArtworkRepository,
        private readonly artworkRepository: ArtworkRepository
    ) {}

    async createInterestArtwork(user: User, interestRequestDTO: InterestRequestDTO): Promise<boolean> {
        try {
            const { artworkId, isInterest } = interestRequestDTO;
            const artwork = await this.artworkRepository.findOne(artworkId);

            isInterest === 'true'
                ? await this.interestArtworkRepository.createInterestArtwork(user, artwork)
                : await this.interestArtworkRepository.deleteInterestArtwork(user, artwork);

            return true;
        } catch(err) {
            throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
