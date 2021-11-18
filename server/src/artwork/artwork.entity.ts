import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Auction } from '../auction/auction.entity';
import { ArtworkStatus } from './artwork.status.enum';
import { InterestArtwork } from '../interestArtwork/interestArtwork.entity';
import { ArtworkInBid } from '../artworkInBid/artworkInBid.entity';

@Entity()
export class Artwork {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    type: string;

    @Column({ nullable: true })
    price: string;

    @Column()
    description: string;

    @Column({
        type: 'enum',
        enum: ArtworkStatus,
        default: ArtworkStatus.NoBid,
    })
    status: string;

    @Column()
    cid: string;

    @Column({ nullable: true })
    nftToken: string;

    @Column({ type: 'text' })
    originalImage: string;

    @Column({ type: 'text' })
    croppedImage: string;

    @Column({ nullable: true })
    exhibitionId: number;

    @ManyToOne(type => User, user => user.artworks)
    artist: User;

    @ManyToOne(type => User, user => user.biddedArtworks)
    owner: User;

    @OneToMany(type => InterestArtwork, interestArtwork => interestArtwork.artwork)
    interestedUsers: InterestArtwork[];

    @OneToMany(type => ArtworkInBid, artworkInBid => artworkInBid.artwork)
    usersInBid: User[];

    @OneToOne(type => Auction, auction => auction.artwork, {
        cascade: true,
    })
    auction: Auction;
}
