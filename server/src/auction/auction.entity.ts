import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artwork } from '../artwork/artwork.entity';
import { User } from '../user/user.entity';
import { AuctionHistory } from '../auctionHistory/auctionHistory.entity';

@Entity()
export class Auction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'datetime' })
    startAt: Date;

    @Column({ type: 'datetime' })
    endAt: Date;

    @ManyToOne(type => User, user => user.id)
    owner: User;

    @OneToOne(type => Artwork, artwork => artwork.id)
    artwork: Artwork;

    @OneToMany(type => AuctionHistory, auctionHistory => auctionHistory.auction)
    auctionHistories: AuctionHistory[];
}
