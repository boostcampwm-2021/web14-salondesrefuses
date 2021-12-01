import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionModule } from '@auction/auction.module';
import { AuctionHistoryModule } from '@auctionHistory/auctionHistory.module';
import { CompletedAuctionRepository } from './completedAuction.repository';
import { CompletedAuctionService } from './completedAuction.service';

@Module({
    imports: [AuctionModule, AuctionHistoryModule, TypeOrmModule.forFeature([CompletedAuctionRepository])],
    providers: [CompletedAuctionService],
    exports: [CompletedAuctionService],
})
export class CompletedAuctionModule {}
