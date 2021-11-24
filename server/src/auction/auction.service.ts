import { Injectable, NotFoundException } from '@nestjs/common';
import { Auction } from './auction.entity';
import { AuctionRepository } from './auction.repository';
import { AuctionDetailDTO, AuctionListItemDTO } from './dto/auction.dto';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export default class AuctionService {
    constructor(private readonly auctionRepository: AuctionRepository) {
    }

    async getRandomAuctions(): Promise<AuctionListItemDTO[]> {
        const auctions = await this.auctionRepository.findRandomAuctions();
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
        if (!auction) {
            throw new NotFoundException(`Can't find auction with id: ${auctionId}`);
        }
        return AuctionDetailDTO.from(auction);
    }

    async closeAuction(auctionId: number): Promise<Auction> {
        const auction = await this.auctionRepository.deleteAuction(auctionId);
        if (!auction) {
            throw new NotFoundException(`Can't find auction with id: ${auctionId}`);
        }
        return auction;
    }

    async getAuctionInfo(auctionId: number): Promise<Auction> {
        const auction = await this.auctionRepository.findAuctionInfo(auctionId);
        if (!auction) {
            throw new NotFoundException(`Can't find auction with id: ${auctionId}`);
        }
        return auction;
    }

    async updateAuction(auctionId: number, updateColumns: QueryDeepPartialEntity<Auction>) {
        const result = await this.auctionRepository.update({ id: auctionId }, updateColumns);
        if (result.affected){
            throw new NotFoundException(`Can't find auction with id: ${auctionId}`);
        }
    }

    getEndedAuctions(): Promise<Auction[]> {
        return this.auctionRepository.findEndedAuctions();
    }
}
