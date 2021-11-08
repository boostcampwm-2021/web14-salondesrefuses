import { Module } from '@nestjs/common';
import { AuctionGateway } from './auction.gateway';

@Module({
    providers: [ AuctionGateway ]
})
export class AuctionModule {}
