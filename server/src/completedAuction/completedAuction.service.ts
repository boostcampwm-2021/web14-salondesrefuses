import { Injectable } from '@nestjs/common';
import { CompletedAuctionRepository } from './completedAuction.repository';
import AuctionService from '../auction/auction.service';
import { AuctionHistoryService } from '../auctionHistory/auctionHistory.service';
import { CompletedAuction } from './completedAuction.entity';

@Injectable()
export class CompletedAuctionService {
    constructor(
        private readonly auctionService: AuctionService,
        private readonly auctionHistoryService: AuctionHistoryService,
        private readonly completedAuctionRepository: CompletedAuctionRepository
    ) {}

    async closeAuction(auctionId: number): Promise<CompletedAuction> {
        const { bidder, price, biddedAt } = await this.auctionHistoryService.deleteAuctionHistories(auctionId);
        const { id, seller, artwork, startAt, endAt } = await this.auctionService.closeAuction(auctionId);

        return await this.completedAuctionRepository.save({
            id,
            artworkId: artwork.id,
            sellerId: seller.id,
            startAt,
            endAt,
            bidderId: bidder.id,
            price,
            biddedAt,
        });
    }

}
