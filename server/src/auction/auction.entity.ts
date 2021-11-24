import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artwork } from '../artwork/artwork.entity';
import { AuctionHistory } from '../auctionHistory/auctionHistory.entity';
import { User } from '../user/user.entity';

@Entity()
export class Auction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    startAt: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    endAt: Date;

    @ManyToOne(type => User)
    seller: User;

    @OneToOne(type => Artwork, artwork => artwork.auction)
    @JoinColumn()
    artwork: Artwork;

    @Column({ nullable: true })
    isComplete: boolean;

    @OneToMany(type => AuctionHistory, auctionHistory => auctionHistory.auction)
    auctionHistories: AuctionHistory[];
}
