import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CronTaskService } from './crontask.service';

@Controller()
@ApiTags('크론 태스크 잡 컨트롤러')
export class CronTaskController {
    constructor(private readonly cronTaskService: CronTaskService) {}

    @Get('/:auctionId')
    async auctionComplete(@Param('auctionId') auctionId: number) {
        this.cronTaskService.completeAuction(auctionId);
        return true;
    }
}
