import { Module } from '@nestjs/common';
import { ArtworkModule } from 'src/artwork/artwork.module';
import { AuctionModule } from 'src/auction/auction.module';
import { CompletedAuctionModule } from 'src/completedAuction/completedAuction.module';
import { CronTaskController } from './crontask.controller';
import { CronTaskService } from './crontask.service';

@Module({
    imports: [AuctionModule, ArtworkModule, CompletedAuctionModule],
    controllers: [CronTaskController],
    providers: [CronTaskService],
})
export class CronTaskModule {}
