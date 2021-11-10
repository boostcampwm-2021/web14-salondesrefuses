import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ExhibitionService } from '../service/exhibition.service';
import { ExhibitionDTO } from '../dto/exhibitionDTO';
import {
    ApiOperation,
    ApiProperty, ApiQuery, ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import {
    getExhibitionApiResponse, getExhibitionsSortedByDeadlineApiOperation, getExhibitionsSortedByInterestApiOperation,
    getNewestExhibitionApiOperation,
    getRandomExhibitionApiResponse,
    getRandomExhibitionsAPiOperation,
} from '../swagger';

@Controller('/exhibitions')
@ApiTags('전시회 컨트롤러')
export class ExhibitionController {
    constructor(private exhibitionService: ExhibitionService) {}

    @Get('/random')
    @ApiOperation(getRandomExhibitionsAPiOperation)
    @ApiResponse(getRandomExhibitionApiResponse)
    @ApiProperty({})
    getRandomExhibitions(): Promise<ExhibitionDTO[]> {
        return this.exhibitionService.getRandomExhibitions();
    }

    @Get('/newest')
    @ApiOperation(getNewestExhibitionApiOperation)
    @ApiResponse(getExhibitionApiResponse)
    @ApiQuery({name: "page", type: Number })
    getNewestExhibitions(@Query('page', ParseIntPipe) page: number): Promise<ExhibitionDTO[]> {
        return this.exhibitionService.getNewestExhibitions(page);
    }

    @Get('/deadline')
    @ApiOperation(getExhibitionsSortedByDeadlineApiOperation)
    @ApiResponse(getExhibitionApiResponse)
    @ApiQuery({name: "page", type: Number })
    getExhibitionsSortedByDeadline(@Query('page', ParseIntPipe) page: number): Promise<ExhibitionDTO[]> {
        return this.exhibitionService.getExhibitionsSortedByDeadline(page);
    }

    @Get('/popular')
    @ApiOperation(getExhibitionsSortedByInterestApiOperation)
    @ApiResponse(getExhibitionApiResponse)
    @ApiQuery({name: "page", type: Number })
    getExhibitionsSortedByInterest(@Query('page', ParseIntPipe) page: number): Promise<ExhibitionDTO[]> {
        return this.exhibitionService.getExhibitionsSortedByInterest(page);
    }


}
