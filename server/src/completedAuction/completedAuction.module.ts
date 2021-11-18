import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompletedAuctionRepository } from './completedAuction.repository';
import { CompletedAuctionService } from './completedAuction.service';
import { AuctionModule } from '../auction/auction.module';
import { AuctionHistoryModule } from '../auctionHistory/auctionHistory.module';

@Module({
    imports: [AuctionModule, AuctionHistoryModule, TypeOrmModule.forFeature([CompletedAuctionRepository])],
    providers: [CompletedAuctionService],
    exports: [CompletedAuctionService],
})
export class CompletedAuctionModule {}
