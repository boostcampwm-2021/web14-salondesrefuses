import { Module } from '@nestjs/common';
import { AuctionGateway } from './auction.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionRepository } from './auction.repository';
import { AuctionHistoryModule } from '../auctionHistory/auctionHistory.module';
import AuctionController from './controller/auction.controller';
import AuctionService from './service/auction.service';

@Module({
    imports: [
        AuctionHistoryModule,
        TypeOrmModule.forFeature([AuctionRepository]),
    ],
    controllers: [AuctionController],
    providers: [AuctionService, AuctionGateway],
})
export class AuctionModule {}
