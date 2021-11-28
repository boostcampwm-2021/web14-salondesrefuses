import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { ExhibitionModule } from './exhibition/exhibition.module';
import { ArtworkModule } from './artwork/artwork.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuctionModule } from './auction/auction.module';
import { SseModule } from './utils/sse/sse.module';
import { InterestArtworkModule } from './interestArtwork/interestArtwork.module';
import { CategoryModule } from './category/category.module';
import { AuctionHistoryModule } from './auctionHistory/auctionHistory.module';
import { CompletedAuctionModule } from './completedAuction/completedAuction.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronTaskModule } from './cronTask/crontask.module';
import { PortModule } from './utils/port/port.module';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        TypeOrmModule.forRoot(typeORMConfig),
        ExhibitionModule,
        ArtworkModule,
        UserModule,
        AuthModule,
        AuctionModule,
        InterestArtworkModule,
        SseModule,
        CategoryModule,
        AuctionHistoryModule,
        CompletedAuctionModule,
        CronTaskModule,
        PortModule
    ],
})
export class AppModule {}
