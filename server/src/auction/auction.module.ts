import { Module } from '@nestjs/common';
import { AuctionGateway } from './auction.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionRepository } from './auction.repository';
import { AuctionHistoryModule } from '../auctionHistory/auctionHistory.module';
import AuctionController from './controller/auction.controller';
import AuctionService from './service/auction.service';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';

@Module({
    imports: [
        AuctionHistoryModule,
        TypeOrmModule.forFeature([AuctionRepository, UserRepository]),
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
        }),
    ],
    controllers: [AuctionController],
    providers: [AuctionService, AuctionGateway],
    exports: [AuctionService],
})
export class AuctionModule {}
