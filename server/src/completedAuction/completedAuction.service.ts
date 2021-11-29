import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CompletedAuctionRepository } from './completedAuction.repository';
import AuctionService from '../auction/auction.service';
import { AuctionHistoryService } from '../auctionHistory/auctionHistory.service';
import { CompletedAuction } from './completedAuction.entity';
import { Transaction } from 'typeorm';

@Injectable()
export class CompletedAuctionService {
    constructor(
        private readonly auctionService: AuctionService,
        private readonly auctionHistoryService: AuctionHistoryService,
        private readonly completedAuctionRepository: CompletedAuctionRepository,
    ) {}

    @Transaction()
    async closeAuction(auctionId: number): Promise<CompletedAuction> {
        try {
            const { bidder, price, biddedAt } = await this.auctionHistoryService.deleteAuctionHistories(auctionId);
            const { id, seller, artwork, startAt, endAt } = await this.auctionService.closeAuction(auctionId);
            return await this.completedAuctionRepository.save({
                id,
                artworkId: artwork.id,
                sellerId: seller.id,
                startAt,
                endAt,
                bidderId: bidder ? bidder.id : null,
                price,
                biddedAt,
            });
        } catch (error) {
            throw new InternalServerErrorException('create completed acution error');
        }
    }
}
