import { ApiProperty } from '@nestjs/swagger';
import { Artwork } from 'src/artwork/artwork.entity';
import { AuctionHistory } from 'src/auctionHistory/auctionHistory.entity';
import { Auction } from '../auction.entity';
import { User } from '../../user/user.entity';

export class AuctionListItemDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    thumbnailImage: string;

    @ApiProperty()
    price: string;

    @ApiProperty()
    type: string;

    @ApiProperty()
    artist: string;

    static from(auction: Auction): AuctionListItemDTO {
        const dto = new AuctionListItemDTO();
        const { title, description, croppedImage, price, type, artist } = auction.artwork;
        const { name } = artist;

        dto.id = auction.id;
        dto.title = title;
        dto.description = description;
        dto.thumbnailImage = croppedImage;
        dto.price = price;
        dto.type = type;
        dto.artist = name;

        return dto;
    }
}

export class AuctionDetailDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    artwork: Artwork;

    @ApiProperty()
    artist: User;

    @ApiProperty()
    auctionHistories: AuctionHistory[];

    @ApiProperty()
    startAt: Date;

    @ApiProperty()
    endAt: Date;

    static from(auction: Auction): AuctionDetailDTO {
        const { id, artwork, auctionHistories, endAt } = auction;
        const { artist } = artwork;

        const dto = new AuctionDetailDTO();
        dto.id = id;
        dto.artwork = artwork;
        dto.artist = artist;
        dto.auctionHistories = auctionHistories;
        dto.endAt = endAt;
        return dto;
    }
}
