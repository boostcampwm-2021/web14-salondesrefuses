import { ApiProperty } from '@nestjs/swagger';
import { Artwork } from 'src/artwork/artwork.entity';
import { AuctionHistory } from 'src/auctionHistory/auctionHistory.entity';
import { Auction } from '../auction.entity';

export class AuctionListItemDTO {
    constructor(auction: Auction) {
        this.id = auction.id;
        this.artwork = auction.artwork;
    }

    @ApiProperty()
    id: number;

    @ApiProperty()
    artwork: Artwork;
}

export class AuctionDetailDTO {
    constructor(auction: Auction) {
        this.id = auction.id;
        this.artowrk = auction.artwork;
        this.auctionHistories = auction.auctionHistories;
    }

    @ApiProperty()
    id: number;

    @ApiProperty()
    artowrk: Artwork;

    @ApiProperty()
    auctionHistories: AuctionHistory[];
}
