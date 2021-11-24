import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artwork } from '../artwork/artwork.entity';

@Entity()
export class InterestArtwork {
    @PrimaryGeneratedColumn()
    id: number;

    userId: number;

    @ManyToOne(type => Artwork)
    artwork: Artwork;
}
