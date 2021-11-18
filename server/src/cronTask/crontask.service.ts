import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ArtworkService } from 'src/artwork/service/artwork.service';
import AuctionService from 'src/auction/service/auction.service';
import { ethers } from 'ethers';
// import * as contractAddress from './ethereum/address.json';
// import * as abi from './ethereum/abi.json';

@Injectable()
export class CronTaskService {
    private readonly logger = new Logger(CronTaskService.name);
    private provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545'); // TODO 환경변수 처리
    // private contract = new ethers.Contract(contractAddress.address, abi.abi, this.provider);
    // private wallet = new ethers.Wallet(process.env.CONTRACT_OWNER_PRIVATE_KEY, this.provider);

    constructor(private readonly auctionService: AuctionService, private readonly artworkService: ArtworkService) {}

    @Cron(CronExpression.EVERY_DAY_AT_4AM)
    async changeAuctionState() {
        this.logger.debug('Called when the every day 04:00');
        const auctions = await this.auctionService.getEndedAuctions();

        this.auctionService.bulkUpdateIsComplete(auctions.map(auction => auction.id));
        this.artworkService.bulkUpdateArtworkState(auctions.map(auction => auction.artwork.id));
    }
}
