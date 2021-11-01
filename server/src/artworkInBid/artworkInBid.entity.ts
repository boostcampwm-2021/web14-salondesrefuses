import { Entity,   ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { User } from '../user/user.entity';
import { Artwork } from '../artwork/artwork.entity';

@Entity()
export class ArtworkInBid {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.artworksInBid)
    user: User;

    @ManyToOne(type => Artwork, artwork => artwork.usersInBid)
    artwork: Artwork;
}
