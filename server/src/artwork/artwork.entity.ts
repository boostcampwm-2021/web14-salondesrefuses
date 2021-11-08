import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Auction } from '../auction/auction.entity';
import { ArtworkStatus } from './artwork.status.enum';
import { InterestArtwork } from '../interestArtwork/interestArtwork.entity';
import { ArtworkInBid } from '../artworkInBid/artworkInBid.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Artwork {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    title: string;

    @Column()
    @ApiProperty()
    type: string;

    @Column({ nullable: true })
    @ApiProperty()
    price: string;

    @Column()
    @ApiProperty()
    description: string;

    @Column({
        type: 'enum',
        enum: ArtworkStatus,
        default: ArtworkStatus.NoBid,
    })
    @ApiProperty()
    status: string;

    @Column()
    @ApiProperty()
    nftToken: string;

    @Column({ type: 'text' })
    @ApiProperty()
    originalImage: string;

    @Column({ type: 'text' })
    @ApiProperty()
    croppedImage: string;

    @Column({ nullable: true })
    @ApiProperty()
    exhibitionId: number;

    @ManyToOne(type => User, user => user.artworks)
    @ApiProperty({ type: () => User })
    artist: User;

    @ManyToOne(type => User, user => user.biddedArtworks)
    @ApiProperty({ type: () => User })
    owner: User;

    @OneToMany(
        type => InterestArtwork,
        interestArtwork => interestArtwork.artwork,
    )
    @ApiProperty({ type: () => [InterestArtwork] })
    interestedUsers: InterestArtwork[];

    @OneToMany(type => ArtworkInBid, artworkInBid => artworkInBid.artwork)
    @ApiProperty({ type: () => [User] })
    usersInBid: User[];

    @OneToOne(type => Auction, auction => auction.artwork, {
        cascade: true,
    })
    @ApiProperty()
    auction: Auction;
}
