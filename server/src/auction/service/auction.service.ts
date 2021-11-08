import { Injectable } from '@nestjs/common';
import { AuctionRepository } from '../auction.repository';
import { AuctionDetailDTO, AuctionListItemDTO } from '../dto/auctionDTOs';

@Injectable()
export default class AuctionService {
    constructor(private readonly auctionRepository: AuctionRepository) {}

    async getAuctionsWithPageable(page: number): Promise<AuctionListItemDTO[]> {
        const auctions =
            await this.auctionRepository.findAllByAuctionWithArtworkAndPageable(
                page,
            );

        return auctions.map(auction => AuctionListItemDTO.from(auction));
    }

    async getAuctionDetail(auctionId: number): Promise<AuctionDetailDTO> {
        const auction =
            await this.auctionRepository.findByAuctionWithAuctionHistoryAndArtwork(
                auctionId,
            );

        return AuctionDetailDTO.from(auction);
    }
}
