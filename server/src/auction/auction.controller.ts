import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuctionDetailDTO, AuctionListItemDTO } from './dto/auction.dto';
import AuctionService from './auction.service';
import {
    getAuctionDetailApiOperation,
    getAuctionsSortedByPopularApiOperation,
    getAuctionsSortedByNewsestApiOperation,
    getRandomAuctionsApiOperation,
    getAuctionIdsApiOperation,
} from './swagger';

@Controller('auctions')
@ApiTags('옥션 컨트롤러')
export default class AuctionController {
    constructor(private readonly auctionService: AuctionService) {}

    @Get('')
    @ApiOperation(getAuctionIdsApiOperation)
    getExhibitionsIds(): Promise<number[]> {
        return this.auctionService.getAuctionIds();
    }

    @Get('/random')
    @ApiOperation(getRandomAuctionsApiOperation)
    @ApiResponse({ type: AuctionListItemDTO })
    getRandomAuctions(): Promise<AuctionListItemDTO[]> {
        return this.auctionService.getRandomAuctions();
    }

    @Get('/newest')
    @ApiOperation(getAuctionsSortedByNewsestApiOperation)
    @ApiQuery({ name: 'page', type: Number })
    @ApiResponse({ type: AuctionListItemDTO })
    getAuctionsOrderByNewest(@Query('page', ParseIntPipe) page: number): Promise<AuctionListItemDTO[]> {
        if (page < 0) {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        }
        return this.auctionService.getAuctionsSortedByNewest(page);
    }

    @Get('/popular')
    @ApiOperation(getAuctionsSortedByPopularApiOperation)
    @ApiQuery({ name: 'page', type: Number })
    @ApiResponse({ type: AuctionListItemDTO })
    getAuctionsOrderByPopular(@Query('page', ParseIntPipe) page: number): Promise<AuctionListItemDTO[]> {
        if (page < 0) {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        }
        return this.auctionService.getAuctionsSortedByPopular(page);
    }

    @Get('/:id')
    @ApiOperation(getAuctionDetailApiOperation)
    @ApiResponse({ type: AuctionDetailDTO })
    getAuctionDetail(@Param('id', ParseIntPipe) auctionId: number): Promise<AuctionDetailDTO> {
        return this.auctionService.getAuctionDetail(auctionId);
    }
}
