import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Auction } from '../auction/auction.entity';
import { ArtworkStatus } from './artwork.status.enum';

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
        default: ArtworkStatus.NoBid
    })
    status: string;

    @Column()
    nftToken: string;

    @Column()
    originalImage: string;

    @Column()
    croppedImage: string;

    @Column({ nullable: true })
    exhibitionId: number;

    @ManyToOne(type => User, user => user.artworks)
    artist: User;

    @ManyToOne(type => User, user => user.biddedArtworks)
    owner: User;

    @ManyToMany(type => User, user => user.interestArtworks)
    @JoinTable({
        name: 'interest_artwork',
        joinColumn: {
            name: 'artwork_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        }
    })
    interestedUsers: User[];

    @ManyToMany(type => User, user => user.artworksInBid)
    @JoinTable({
        name: 'artwork_in_bid',
        joinColumn: {
            name: 'artwork_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        }
    })
    usersInBid: User[];

    @OneToOne(type => Auction, auction => auction.artwork)
    auction: Auction;
}
