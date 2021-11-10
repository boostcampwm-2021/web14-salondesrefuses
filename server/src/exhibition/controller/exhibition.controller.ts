import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ExhibitionService } from '../service/exhibition.service';
import { ExhibitionDTO } from '../dto/exhibitionDTO';
import {
    ApiOperation,
    ApiProperty, ApiQuery, ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import {
    getExhibitionsSortedByDeadlineApiOperation,
    getExhibitionsSortedByInterestApiOperation,
    getNewestExhibitionApiOperation,
    getRandomExhibitionsAPiOperation,
} from '../swagger';

@Controller('/exhibitions')
@ApiTags('전시회 컨트롤러')
export class ExhibitionController {
    constructor(private exhibitionService: ExhibitionService) {}

    @Get('/random')
    @ApiOperation(getRandomExhibitionsAPiOperation)
    @ApiResponse({ type: ExhibitionDTO })
    @ApiProperty({})
    getRandomExhibitions(): Promise<ExhibitionDTO[]> {
        return this.exhibitionService.getRandomExhibitions();
    }

    @Get('/newest')
    @ApiOperation(getNewestExhibitionApiOperation)
    @ApiResponse({ type: ExhibitionDTO })
    @ApiQuery({name: "page", type: Number })
    getNewestExhibitions(@Query('page', ParseIntPipe) page: number): Promise<ExhibitionDTO[]> {
        return this.exhibitionService.getNewestExhibitions(page);
    }

    @Get('/deadline')
    @ApiOperation(getExhibitionsSortedByDeadlineApiOperation)
    @ApiResponse({ type: ExhibitionDTO })
    @ApiQuery({name: "page", type: Number })
    getExhibitionsSortedByDeadline(@Query('page', ParseIntPipe) page: number): Promise<ExhibitionDTO[]> {
        return this.exhibitionService.getExhibitionsSortedByDeadline(page);
    }

    @Get('/popular')
    @ApiOperation(getExhibitionsSortedByInterestApiOperation)
    @ApiResponse({ type: ExhibitionDTO })
    @ApiQuery({name: "page", type: Number })
    getExhibitionsSortedByInterest(@Query('page', ParseIntPipe) page: number): Promise<ExhibitionDTO[]> {
        return this.exhibitionService.getExhibitionsSortedByInterest(page);
    }


}
