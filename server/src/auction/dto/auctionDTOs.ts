import { ApiProperty } from '@nestjs/swagger';
import { Artwork } from 'src/artwork/artwork.entity';
import { AuctionHistory } from 'src/auctionHistory/auctionHistory.entity';
import { Auction } from '../auction.entity';

export class AuctionListItemDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    artwork: Artwork;

    static from(auction: Auction): AuctionListItemDTO {
        const dto = new AuctionListItemDTO();
        dto.id = auction.id;
        dto.artwork = auction.artwork;
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

    static from(auction: Auction): AuctionDetailDTO {
        const dto = new AuctionDetailDTO();
        dto.id = auction.id;
        dto.artwork = auction.artwork;
        dto.auctionHistories = auction.auctionHistories;
        return dto;
    }
}
