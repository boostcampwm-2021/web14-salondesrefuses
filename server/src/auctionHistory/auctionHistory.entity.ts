import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Auction } from '../auction/auction.entity';

@Entity()
export class AuctionHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bidderId: string;

    @Column()
    price: string;

    @Column({ type: 'datetime' })
    biddedAt: Date;

    @ManyToOne(type => Auction, auction => auction.auctionHistories)
    auction: Auction;
}
