import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionHistoryRepository } from './auctionHistory.repository';
import { AuctionHistoryService } from './auctionHistory.service';
import { AuctionRepository } from '@auction/auction.repository';
import { UserRepository } from '@user/user.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([ AuctionHistoryRepository, AuctionRepository, UserRepository ]),
    ],
    providers: [ AuctionHistoryService ],
    exports: [ AuctionHistoryService ],
})
export class AuctionHistoryModule {}
