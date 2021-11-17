import { Injectable } from '@nestjs/common';
import { Auction } from '../auction.entity';
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
    
    async closeAuction(auctionId: number): Promise<Auction> {
        return this.auctionRepository.deleteAuction(auctionId);
    }

    async getAuctionInfo(auctionId: number): Promise<Auction> {
        return this.auctionRepository.findOne(auctionId);
    }

    async updateAuctionEndAt(auctionId: number, newEndAt: Date): Promise<void> {
        const auction = await this.auctionRepository.findOne(auctionId);
        auction.endAt = newEndAt;
        this.auctionRepository.save(auction);
    }
}
