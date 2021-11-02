import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Artwork } from '../artwork/artwork.entity';
import { User } from '../user/user.entity';
import { AuctionHistory } from '../auctionHistory/auctionHistory.entity';

@Entity()
export class Auction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    startAt: Date;

    @Column({ type: 'timestamptz' })
    endAt: Date;

    @ManyToOne(type => User, user => user.auctionList)
    seller: User;

    @OneToOne(type => Artwork)
    @JoinColumn()
    artwork: Artwork;

    @OneToMany(type => AuctionHistory, auctionHistory => auctionHistory.auction)
    auctionHistories: AuctionHistory[];
}
