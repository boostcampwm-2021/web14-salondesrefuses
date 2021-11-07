import { Injectable } from '@nestjs/common';
import { AuctionRepository } from '../auction.repository';
import { AuctionDetailDTO, AuctionListItemDTO } from '../dto/auctionDTOs';

@Injectable()
export default class AuctionService {
    constructor(private readonly auctionRepository: AuctionRepository) {}

    async getAuctionsWithPageable(page: number): Promise<AuctionListItemDTO[]> {
        const auctions = await this.auctionRepository.getAuctionsWithPageable(
            page,
        );

        return auctions.map(auction => new AuctionListItemDTO(auction));
    }

    async getAuctionDetail(auctionId: number): Promise<AuctionDetailDTO> {
        // @TODO 상세조회
        return;
    }
}
