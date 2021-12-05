import { Controller, Get, Logger, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CronTaskService } from './crontask.service';

@Controller('cronTask')
@ApiTags('크론 태스크 잡 컨트롤러')
export class CronTaskController {
    private readonly logger = new Logger(CronTaskController.name);

    constructor(private readonly cronTaskService: CronTaskService) {}

    @Get('/:auctionId')
    async auctionComplete(@Param('auctionId') auctionId: number) {
        try {
            await this.cronTaskService.completeAuction(auctionId);
            return true;
        } catch (error) {
            this.logger.error(`cronTaskService: ${error}`);
            return false;
        }
    }
}
