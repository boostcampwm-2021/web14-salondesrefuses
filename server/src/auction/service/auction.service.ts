import { Injectable } from '@nestjs/common';
import { AuctionRepository } from '../auction.repository';
import { AuctionDetailDTO, AuctionListItemDTO } from '../dto/auctionDTOs';
import { Auction } from '../auction.entity';

@Injectable()
export default class AuctionService {
    constructor(private readonly auctionRepository: AuctionRepository) {}

    async getRandomAuctions(): Promise<AuctionListItemDTO[]> {
        const auctions = await this.auctionRepository.getRandomAuctions();
        return auctions.map(auction => AuctionListItemDTO.from(auction));
    }

    async getAuctionsSortedByNewest(page: number): Promise<AuctionListItemDTO[]> {
        const auctions = await this.auctionRepository.findAllByAuctionOrderByNewest(page);
        return auctions.map(auction => AuctionListItemDTO.from(auction));
    }

    async getAuctionsSortedByPopular(page: number): Promise<AuctionListItemDTO[]> {
        const auctions = await this.auctionRepository.findAllByAuctionOrderByPopular(page);
        return auctions.map(auction => AuctionListItemDTO.from(auction));
    }

    async getAuctionDetail(auctionId: number): Promise<AuctionDetailDTO> {
        const auction = await this.auctionRepository.findByAuctionWithAuctionHistoryAndArtwork(auctionId);
        return AuctionDetailDTO.from(auction);
    }

    closeAuction(auctionId: number): Promise<Auction> {
        return this.auctionRepository.deleteAuction(auctionId);
    }

}
