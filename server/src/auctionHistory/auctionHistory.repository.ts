import { EntityRepository, Repository } from 'typeorm';
import { AuctionHistory } from './auctionHistory.entity';

@EntityRepository(AuctionHistory)
export class AuctionHistoryRepository extends Repository<AuctionHistory> {
}
