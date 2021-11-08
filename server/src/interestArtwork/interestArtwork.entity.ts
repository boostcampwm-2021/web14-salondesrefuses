import { Entity,   ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { User } from '../user/user.entity';
import { Artwork } from '../artwork/artwork.entity';

@Entity()
export class InterestArtwork {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.interestArtworks)
    user: User;

    @ManyToOne(type => Artwork, artwork => artwork.interestedUsers)
    artwork: Artwork;
}
