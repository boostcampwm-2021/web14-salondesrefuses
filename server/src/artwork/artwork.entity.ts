import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Auction } from '../auction/auction.entity';
import { ArtworkStatus } from './enum/artwork.enum';

@Entity()
export class Artwork {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    type: string;

    @Column({ nullable: true })
    year: string;

    @Column({ nullable: true })
    price: string;

    @Column({ type: 'text' })
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

    @ManyToOne(type => User)
    artist: User;

    @ManyToOne(type => User)
    owner: User;

    @OneToOne(type => Auction, auction => auction.artwork, {
        cascade: true,
    })
    auction: Auction;
}
