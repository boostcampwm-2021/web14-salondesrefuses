import { Module } from '@nestjs/common';
import { ArtworkModule } from '@artwork/artwork.module';
import { AuctionModule } from '@auction/auction.module';
import { CompletedAuctionModule } from '@completedAuction/completedAuction.module';
import { CronTaskController } from './crontask.controller';
import { CronTaskService } from './crontask.service';

@Module({
    imports: [AuctionModule, ArtworkModule, CompletedAuctionModule],
    controllers: [CronTaskController],
    providers: [CronTaskService],
})
export class CronTaskModule {}
