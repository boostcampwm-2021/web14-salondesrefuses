import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Artwork } from '../artwork/artwork.entity';
import { Auction } from '../auction/auction.entity';
import { Exhibition } from '../exhibition/exhibition.entity';

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

    @ManyToMany(type => Artwork, artwork => artwork.interestedUsers, { eager: true })
    @JoinTable({
        name: 'interest_artwork',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'artwork_id',
            referencedColumnName: 'id'
        }
    })
    interestArtworks: Artwork[];

    @ManyToMany(type => Artwork, artwork => artwork.usersInBid)
    @JoinTable({
        name: 'artwork_in_bid',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'artwork_id',
            referencedColumnName: 'id'
        }
    })
    artworksInBid: Artwork[];

    @OneToMany(type => Exhibition, exhibition => exhibition.user)
    exhibitionList: Exhibition[];

    @OneToMany(type => Auction, auction => auction.owner)
    auctionList: Auction[];
}
