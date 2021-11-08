import { Module } from '@nestjs/common';
import { AuctionGateway } from './auction.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionRepository } from './auction.repository';
import AuctionController from './controller/auction.controller';
import AuctionService from './service/auction.service';

@Module({
    imports: [TypeOrmModule.forFeature([AuctionRepository])],
    controllers: [AuctionController],
    providers: [AuctionService, AuctionGateway],
})
export class AuctionModule {}
