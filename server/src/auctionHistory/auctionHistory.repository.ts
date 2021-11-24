import { EntityRepository, Repository } from 'typeorm';
import { AuctionHistory } from './auctionHistory.entity';

@EntityRepository(AuctionHistory)
export class AuctionHistoryRepository extends Repository<AuctionHistory> {
    async findHighestAuctionHistory(auctionId: number): Promise<AuctionHistory> {
        return await this.createQueryBuilder('auctionHistory')
            .where('auctionHistory.auction_id = :auctionId', { auctionId })
            .orderBy('auctionHistory.id', 'DESC')
            .getOne();
    }
}
