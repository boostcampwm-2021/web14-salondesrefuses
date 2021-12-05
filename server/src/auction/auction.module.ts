import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionHistoryModule } from '@auctionHistory/auctionHistory.module';
import { AuctionRepository } from './auction.repository';
import AuctionController from './auction.controller';
import AuctionService from './auction.service';
import { AuctionGateway } from './gateway/auction.gateway';

@Module({
    imports: [
        AuctionHistoryModule,
        TypeOrmModule.forFeature([AuctionRepository]),
    ],
    controllers: [AuctionController],
    providers: [AuctionService, AuctionGateway],
    exports: [AuctionService],
})
export class AuctionModule {}
