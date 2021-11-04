import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ExhibitionService } from '../service/exhibition.service';
import { Exhibition } from '../exhibition.entity';
import {
    ApiCreatedResponse,
    ApiOperation,
    ApiProperty,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('전시회 컨트롤러')
@Controller('/exhibitions')
export class ExhibitionController {
    constructor(private exhibitionService: ExhibitionService) {}

    @Get('/random')
    @ApiOperation({
        summary: '전시회 랜덤 5개 조회 API',
        description: '랜덤으로 전시회 5개를 조회한다.',
    })
    @ApiCreatedResponse({
        description: '전시회 객체 5개 배열',
        type: Exhibition,
        isArray: true,
    })
    @ApiProperty({})
    getRandomExhibitions(): Promise<Exhibition[]> {
        return this.exhibitionService.getRandomExhibitions();
    }

    @Get('/newest')
    getNewestExhibition(@Query('page', ParseIntPipe) page: number): Promise<Exhibition[]> {
        return this.exhibitionService.getNewestExhibitions(page);
    }

    @Get('/deadline')
    getExhibitionsSortedByDeadline(@Query('page', ParseIntPipe) page: number): Promise<Exhibition[]> {
        return this.exhibitionService.getExhibitionsSortedByDeadline(page);
    }

    @Get('/popular')
    getExhibitionsSortedByInterest(@Query('page', ParseIntPipe) page: number): Promise<Exhibition[]> {
        return this.exhibitionService.getExhibitionsSortedByInterest(page);
    }


}
