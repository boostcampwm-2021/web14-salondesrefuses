import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Artwork } from '../artwork/artwork.entity';
import { Auction } from '../auction/auction.entity';
import { Exhibition } from '../exhibition/exhibition.entity';
import { InterestArtwork } from '../interestArtwork/interestArtwork.entity';
import { ArtworkInBid } from '../artworkInBid/artworkInBid.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column({ nullable: true })
    nickname: string;

    @Column({ nullable: true })
    snsId: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    avatar: string;

    @Column({ select: false })
    refreshToken: string;

    @Column()
    loginStrategy: string;

    @OneToMany(type => Artwork, artwork => artwork.artist)
    artworks: Artwork[];

    @OneToMany(type => Artwork, artwork => artwork.owner)
    biddedArtworks: Artwork[];

    @OneToMany(type => InterestArtwork, interestArtwork => interestArtwork.user)
    interestArtworks: InterestArtwork[];

    @OneToMany(type => ArtworkInBid, artworkInBid => artworkInBid.user)
    artworksInBid: Artwork[];

    @OneToMany(type => Exhibition, exhibition => exhibition.user)
    exhibitionList: Exhibition[];

    @OneToMany(type => Auction, auction => auction.owner)
    auctionList: Auction[];
}
