import { Logger } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuctionHistoryService } from '../auctionHistory/auctionHistory.service';
import AuctionService from './auction.service';

@WebSocketGateway({
    namespace: '/auction',
    cors: '*',
})
export class AuctionGateway implements OnGatewayInit {
    private readonly logger = new Logger(AuctionGateway.name);

    @WebSocketServer()
    private server: Server;

    constructor(
        private readonly auctionService: AuctionService,
        private readonly auctionHistoryService: AuctionHistoryService,
    ) {}

    afterInit(server: Server): void {
        this.logger.log('socket init');
    }

    @SubscribeMessage('@auction/enter')
    handleEnterAuctionRoom(@MessageBody() auctionId: string, @ConnectedSocket() client: Socket) {
        client.join(auctionId);
    }

    @SubscribeMessage('@auction/leave')
    handleLeaveAuctionRoom(@MessageBody() auctionId: string, @ConnectedSocket() client: Socket) {
        client.leave(auctionId);
    }

    @SubscribeMessage('@auction/bid')
    async handleBidAuction(@MessageBody() bidInfo: string, @ConnectedSocket() client: Socket) {
        const { auctionId, bidderId, bidderName, price, biddedAt } = JSON.parse(JSON.stringify(bidInfo));
        const auction = await this.auctionService.getAuctionInfo(auctionId);

        if (auction.endAt.valueOf() - new Date(biddedAt).valueOf() < 60000) {
            const newEndAt = new Date();
            newEndAt.setMinutes(newEndAt.getMinutes() + 1);

            this.auctionService.updateAuctionEndAt(auctionId, newEndAt);

            this.server.to(auctionId).emit('@auction/time_update', {
                auctionId,
                endAt: newEndAt.valueOf(),
            });
        }

        this.server.to(auctionId).emit('@auction/bid', {
            bidder: {
                name: bidderName,
            },
            price,
            biddedAt,
        });
        this.auctionHistoryService.saveAuctionHistory(auctionId, bidderId, price, biddedAt);
    }
}
