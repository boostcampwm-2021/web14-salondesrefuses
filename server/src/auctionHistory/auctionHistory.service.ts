import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuctionHistory } from './auctionHistory.entity';
import { AuctionHistoryRepository } from './auctionHistory.repository';
import { AuctionRepository } from '../auction/auction.repository';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuctionHistoryService {
    constructor(
        @InjectRepository(AuctionHistoryRepository)
        private readonly auctionHistoryRepository: AuctionHistoryRepository,
        @InjectRepository(AuctionRepository)
        private readonly auctionRepository: AuctionRepository,
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {}

    async saveAuctionHistory(id: string, bidderId: string, price: string, biddedAt: string): Promise<AuctionHistory> {
        const auction = await this.auctionRepository.findOne({ id: Number(id) });
        const bidder = await this.userRepository.findOne(( { id: Number(bidderId) }));

        return await this.auctionHistoryRepository.save({
            auction,
            price,
            biddedAt: new Date(biddedAt),
            bidder,
        });
    }

    async deleteAuctionHistories(id: number): Promise<AuctionHistory> {
        const auction = await this.auctionRepository.findOne({ id });
        const highestAuctionHistory = await this.auctionHistoryRepository.getHighestAuctionHistory(id);

        await this.auctionHistoryRepository.delete({ auction });
        return highestAuctionHistory;
    }

}
