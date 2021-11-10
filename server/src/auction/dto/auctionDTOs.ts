import { ApiProperty } from '@nestjs/swagger';
import { Artwork } from 'src/artwork/artwork.entity';
import { AuctionHistory } from 'src/auctionHistory/auctionHistory.entity';
import { Auction } from '../auction.entity';

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
        const { title, description, croppedImage, price, type } = auction.artwork;
        const { name } = auction.seller;

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
    auctionHistories: AuctionHistory[];

    @ApiProperty()
    startAt: Date;

    @ApiProperty()
    endAt: Date;

    static from(auction: Auction): AuctionDetailDTO {
        const dto = new AuctionDetailDTO();
        dto.id = auction.id;
        dto.artwork = auction.artwork;
        dto.auctionHistories = auction.auctionHistories;
        return dto;
    }
}
