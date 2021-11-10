import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ExhibitionService } from '../service/exhibition.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
    getExhibitionsSortedByDeadlineApiOperation,
    getExhibitionsSortedByInterestApiOperation,
    getNewestExhibitionApiOperation,
    getRandomExhibitionsAPiOperation,
} from '../swagger';
import { ExhibitionListItemDTO } from '../dto/exhibitionDTOs';

@Controller('/exhibitions')
@ApiTags('전시회 컨트롤러')
export class ExhibitionController {
    constructor(private exhibitionService: ExhibitionService) {}

    @Get('/random')
    @ApiOperation(getRandomExhibitionsAPiOperation)
    @ApiResponse({ type: [ExhibitionListItemDTO] })
    getRandomExhibitions(): Promise<ExhibitionListItemDTO[]> {
        return this.exhibitionService.getRandomExhibitions();
    }

    @Get('/newest')
    @ApiOperation(getNewestExhibitionApiOperation)
    @ApiResponse({ type: [ExhibitionListItemDTO] })
    @ApiQuery({ name: 'page', type: Number })
    getNewestExhibitions(@Query('page', ParseIntPipe) page: number): Promise<ExhibitionListItemDTO[]> {
        return this.exhibitionService.getNewestExhibitions(page);
    }

    @Get('/deadline')
    @ApiOperation(getExhibitionsSortedByDeadlineApiOperation)
    @ApiResponse({ type: [ExhibitionListItemDTO] })
    @ApiQuery({ name: 'page', type: Number })
    getExhibitionsSortedByDeadline(@Query('page', ParseIntPipe) page: number): Promise<ExhibitionListItemDTO[]> {
        return this.exhibitionService.getExhibitionsSortedByDeadline(page);
    }

    @Get('/popular')
    @ApiOperation(getExhibitionsSortedByInterestApiOperation)
    @ApiResponse({ type: [ExhibitionListItemDTO] })
    @ApiQuery({ name: 'page', type: Number })
    getExhibitionsSortedByInterest(@Query('page', ParseIntPipe) page: number): Promise<ExhibitionListItemDTO[]> {
        return this.exhibitionService.getExhibitionsSortedByInterest(page);
    }
}
