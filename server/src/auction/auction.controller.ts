import { Get, Param, Query, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { AuctionDetailDTO, AuctionListItemDTO } from './dto/auction.dto';
import AuctionService from './auction.service';
import {
    _AuctionController,
    GetExhibitionIdsApi,
    GetRandomAuctionsApi,
    GetAuctionsOrderByNewestApi,
    GetAuctionsOrderByPopularApi, GetAuctionDetailApi,
} from './decorator';

@_AuctionController()
export default class AuctionController {
    constructor(private readonly auctionService: AuctionService) {}

    @Get()
    @GetExhibitionIdsApi()
    getExhibitionsIds(): Promise<number[]> {
        return this.auctionService.getAuctionIds();
    }

    @Get('/random')
    @GetRandomAuctionsApi()
    getRandomAuctions(): Promise<AuctionListItemDTO[]> {
        return this.auctionService.getRandomAuctions();
    }

    @Get('/newest')
    @GetAuctionsOrderByNewestApi()
    getAuctionsOrderByNewest(@Query('page', ParseIntPipe) page: number): Promise<AuctionListItemDTO[]> {
        if (page < 0) {
            throw new BadRequestException('Page must be greater than or equal to 0');
        }
        return this.auctionService.getAuctionsSortedByNewest(page);
    }

    @Get('/popular')
    @GetAuctionsOrderByPopularApi()
    getAuctionsOrderByPopular(@Query('page', ParseIntPipe) page: number): Promise<AuctionListItemDTO[]> {
        if (page < 0) {
            throw new BadRequestException('Page must be greater than or equal to 0');
        }
        return this.auctionService.getAuctionsSortedByPopular(page);
    }

    @Get('/:id')
    @GetAuctionDetailApi()
    getAuctionDetail(@Param('id', ParseIntPipe) auctionId: number): Promise<AuctionDetailDTO> {
        return this.auctionService.getAuctionDetail(auctionId);
    }
}
