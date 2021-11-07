import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import {
    ApiBody,
    ApiOperation,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { AuctionDetailDTO, AuctionListItemDTO } from '../dto/auctionDTOs';
import AuctionService from '../service/auction.service';
import {
    getAuctionsWithInfinityScrollApiOperation,
    getAuctionDetailApiOperation,
} from '../swagger';

@Controller('acutions')
@ApiTags('옥션 컨트롤러')
export default class AuctionController {
    constructor(private readonly auctionService: AuctionService) {}

    @Get()
    @ApiOperation(getAuctionsWithInfinityScrollApiOperation)
    @ApiQuery({ name: 'page', type: Number })
    @ApiResponse({ type: AuctionListItemDTO })
    getAuctionsWithInfinityScroll(
        @Query('page', ParseIntPipe) page: number,
    ): Promise<AuctionListItemDTO[]> {
        return this.auctionService.getAuctionsWithPageable(page);
    }

    @Get(':id')
    @ApiOperation(getAuctionDetailApiOperation)
    @ApiResponse({ type: AuctionDetailDTO })
    getAuctionDetail(
        @Param('id', ParseIntPipe) auctionId: number,
    ): Promise<AuctionDetailDTO> {
        return this.auctionService.getAuctionDetail(auctionId);
    }
}
