import {
    ConnectedSocket,
    MessageBody,
    OnGatewayInit, SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuctionHistoryService } from '../auctionHistory/auctionHistory.service';

@WebSocketGateway({
    namespace: '/auction',
    cors: '*'
})
export class AuctionGateway implements OnGatewayInit {

    @WebSocketServer()
    private server: Server;

    constructor(private readonly auctionHistoryService: AuctionHistoryService) {}

    afterInit(server: Server): void {
        console.log('socket init');
    }

    @SubscribeMessage('enter')
    handleEnterAuctionRoom(
        @MessageBody() auctionId: string,
        @ConnectedSocket() client: Socket
    ) {
        client.join(auctionId);
    }

    @SubscribeMessage('leave')
    handleLeaveAuctionRoom(
        @MessageBody() auctionId: string,
        @ConnectedSocket() client: Socket
    ) {
        client.leave(auctionId);
    }

    @SubscribeMessage('bid')
    handleBidAuction(
        @MessageBody() bidInfo: string,
        @ConnectedSocket() client: Socket
    ) {
        const { id, bidderName, price, biddedAt } = JSON.parse(JSON.stringify(bidInfo));
        this.server.to(id).emit('bid', {
            bidderName,
            price,
            biddedAt,
        });
        this.auctionHistoryService.saveAuctionHistory(id, bidderName, price, biddedAt);
    }

}
