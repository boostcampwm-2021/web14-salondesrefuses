import { Module } from '@nestjs/common';
import { ArtworkModule } from 'src/artwork/artwork.module';
import { AuctionModule } from 'src/auction/auction.module';
import { CronTaskService } from './crontask.service';

@Module({
    imports: [AuctionModule, ArtworkModule],
    providers: [CronTaskService],
})
export class CronTaskModule {}
