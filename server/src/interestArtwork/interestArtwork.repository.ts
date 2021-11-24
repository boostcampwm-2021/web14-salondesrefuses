import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { InterestArtwork } from './interestArtwork.entity';
import { User } from '../user/user.entity';
import { Artwork } from '../artwork/artwork.entity';

@EntityRepository(InterestArtwork)
export class InterestArtworkRepository extends Repository<InterestArtwork> {

    createInterestArtwork(user: User, artwork: Artwork): Promise<InterestArtwork> {
        return this.save({
            user,
            artwork
        });
    }

    deleteInterestArtwork(user: User, artwork: Artwork): Promise<DeleteResult> {
        return this.delete({ userId: user.id, artwork });
    }

}
