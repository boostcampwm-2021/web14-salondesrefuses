import { Module } from '@nestjs/common';
import { AuctionModule } from 'src/auction/auction.module';
import { CronTaskService } from './crontask.service';

@Module({
    imports: [AuctionModule],
    providers: [CronTaskService],
})
export class CronTaskModule {}
