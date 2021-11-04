import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ExhibitionService } from '../service/exhibition.service';
import { Exhibition } from '../exhibition.entity';
import {
    ApiOperation,
    ApiProperty, ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import {
    getExhibitionApiResponse, getExhibitionsSortedByDeadlineApiOperation, getExhibitionsSortedByInterestApiOperation,
    getNewestExhibitionApiOperation,
    getRandomExhibitionApiResponse,
    getRandomExhibitionsAPiOperation,
} from '../swagger';

@ApiTags('전시회 컨트롤러')
@Controller('/exhibitions')
export class ExhibitionController {
    constructor(private exhibitionService: ExhibitionService) {}

    @Get('/random')
    @ApiOperation(getRandomExhibitionsAPiOperation)
    @ApiResponse(getRandomExhibitionApiResponse)
    @ApiProperty({})
    getRandomExhibitions(): Promise<Exhibition[]> {
        return this.exhibitionService.getRandomExhibitions();
    }

    @Get('/newest')
    @ApiOperation(getNewestExhibitionApiOperation)
    @ApiResponse(getExhibitionApiResponse)
    getNewestExhibition(@Query('page', ParseIntPipe) page: number): Promise<Exhibition[]> {
        return this.exhibitionService.getNewestExhibitions(page);
    }

    @Get('/deadline')
    @ApiOperation(getExhibitionsSortedByDeadlineApiOperation)
    @ApiResponse(getExhibitionApiResponse)
    getExhibitionsSortedByDeadline(@Query('page', ParseIntPipe) page: number): Promise<Exhibition[]> {
        return this.exhibitionService.getExhibitionsSortedByDeadline(page);
    }

    @Get('/popular')
    @ApiOperation(getExhibitionsSortedByInterestApiOperation)
    @ApiResponse(getExhibitionApiResponse)
    getExhibitionsSortedByInterest(@Query('page', ParseIntPipe) page: number): Promise<Exhibition[]> {
        return this.exhibitionService.getExhibitionsSortedByInterest(page);
    }


}
