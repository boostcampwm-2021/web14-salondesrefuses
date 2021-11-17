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
import AuctionService from './service/auction.service';

@WebSocketGateway({
    namespace: '/auction',
    cors: '*',
})
export class AuctionGateway implements OnGatewayInit {
    @WebSocketServer()
    private server: Server;

    constructor(
        private readonly auctionService: AuctionService,
        private readonly auctionHistoryService: AuctionHistoryService,
    ) {}

    afterInit(server: Server): void {
        console.log('socket init');
    }

    @SubscribeMessage('enter')
    handleEnterAuctionRoom(@MessageBody() auctionId: string, @ConnectedSocket() client: Socket) {
        client.join(auctionId);
    }

    @SubscribeMessage('leave')
    handleLeaveAuctionRoom(@MessageBody() auctionId: string, @ConnectedSocket() client: Socket) {
        client.leave(auctionId);
    }

    @SubscribeMessage('bid')
    async handleBidAuction(@MessageBody() bidInfo: string, @ConnectedSocket() client: Socket) {
        const { id, bidderName, price, biddedAt } = JSON.parse(JSON.stringify(bidInfo));
        const auction = await this.auctionService.getAuctionInfo(id);

        if (auction.endAt.valueOf() - new Date(biddedAt).valueOf() < 60000) {
            const newEndAt = new Date();
            newEndAt.setMinutes(newEndAt.getMinutes() + 1);

            this.auctionService.updateAuctionEndAt(id, newEndAt);

            this.server.to(id).emit('time_update', {
                id,
                endAt: newEndAt.valueOf(),
            });
        }

        this.server.to(id).emit('bid', {
            bidderName,
            price,
            biddedAt,
        });
        this.auctionHistoryService.saveAuctionHistory(id, bidderName, price, biddedAt);
    }
}
