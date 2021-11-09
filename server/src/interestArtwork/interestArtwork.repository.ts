import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { InterestArtwork } from './interestArtwork.entity';
import { User } from '../user/user.entity';
import { Artwork } from '../artwork/artwork.entity';

@EntityRepository(InterestArtwork)
export class InterestArtworkRepository extends Repository<InterestArtwork> {

    async insertInterestArtwork(user: User, artwork: Artwork): Promise<InterestArtwork> {
        return this.save({
            user,
            artwork
        });
    }

    async deleteInterestArtwork(user: User, artwork: Artwork): Promise<DeleteResult> {
        return this.delete({ user, artwork });
    }

}
