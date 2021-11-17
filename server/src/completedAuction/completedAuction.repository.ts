import { EntityRepository, Repository } from 'typeorm';
import { CompletedAuction } from './completedAuction.entity';

@EntityRepository(CompletedAuction)
export class CompletedAuctionRepository extends Repository<CompletedAuction> {
}
