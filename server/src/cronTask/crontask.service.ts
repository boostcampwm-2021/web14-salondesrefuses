import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ArtworkService } from 'src/artwork/artwork.service';
import AuctionService from 'src/auction/auction.service';
import { ethers } from 'ethers';
import * as contractAddress from './ethereum/address.json';
import * as abi from './ethereum/abi.json';
import { CompletedAuctionService } from 'src/completedAuction/completedAuction.service';

@Injectable()
export class CronTaskService {
    private readonly logger = new Logger(CronTaskService.name);
    private provider = new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_HOST);
    private wallet = new ethers.Wallet(process.env.CONTRACT_OWNER_PRIVATE_KEY, this.provider);
    private contract = new ethers.Contract(contractAddress.address, abi.abi, this.wallet);

    constructor(
        private readonly auctionService: AuctionService,
        private readonly artworkService: ArtworkService,
        private readonly completedAuctionService: CompletedAuctionService,
    ) {}

    @Cron(CronExpression.EVERY_DAY_AT_4AM)
    async changeAuctionState() {
        this.logger.debug('Called when the every day 04:00');
        const auctions = await this.auctionService.getEndedAuctions();

        auctions.map(auction => auction.artwork.nftToken).forEach(token => this.transact(Number(token)));
        auctions.forEach(auction => this.completedAuctionService.closeAuction(auction.id));
        this.artworkService.bulkUpdateArtworkState(auctions.map(auction => auction.artwork.id));
    }

    async transact(tokenId: number) {
        const tx = await this.contract.complete(tokenId);
        return await tx.wait();
    }

    async completeAuction(auctionId: number) {
        const auction = await this.auctionService.getAuctionInfo(auctionId);
        await this.transact(Number(auction.artwork.nftToken));

        await this.completedAuctionService.closeAuction(auction.id);
    }
}
