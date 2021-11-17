import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuctionHistory } from './auctionHistory.entity';
import { AuctionHistoryRepository } from './auctionHistory.repository';
import { AuctionRepository } from '../auction/auction.repository';

@Injectable()
export class AuctionHistoryService {
    constructor(
        @InjectRepository(AuctionHistoryRepository)
        private readonly auctionHistoryRepository: AuctionHistoryRepository,
        @InjectRepository(AuctionRepository)
        private readonly auctionRepository: AuctionRepository
    ) {}

    async saveAuctionHistory(id: string, bidderName: string, price: string, biddedAt: string): Promise<AuctionHistory> {
        const auction = await this.auctionRepository.findOne({ id: Number(id) });

        return await this.auctionHistoryRepository.save({
            auction,
            bidderName,
            price,
            biddedAt: new Date(biddedAt),
        });
    }

    async deleteAuctionHistories(id: number): Promise<AuctionHistory> {
        const auction = await this.auctionRepository.findOne({ id });
        const highestAuctionHistory = await this.auctionHistoryRepository.getHighestAuctionHistory(id);

        await this.auctionHistoryRepository.delete({ auction });
        return highestAuctionHistory;
    }

}
