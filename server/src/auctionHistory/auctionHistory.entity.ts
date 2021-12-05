import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Auction } from '@auction/auction.entity';
import { User } from '@user/user.entity';

@Entity()
export class AuctionHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: string;

    @Column({ type: 'datetime' })
    biddedAt: Date;

    @ManyToOne(type => Auction, auction => auction.auctionHistories)
    auction: Auction;

    @ManyToOne(type => User)
    bidder: User;
}
