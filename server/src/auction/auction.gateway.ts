import {
    ConnectedSocket,
    MessageBody,
    OnGatewayInit, SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    namespace: '/auction',
    cors: '*'
})
export class AuctionGateway implements OnGatewayInit {

    @WebSocketServer()
    private server: Server;

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
        const { id, price, userId, date } = JSON.parse(JSON.stringify(bidInfo));
        this.server.to(id).emit('bid', {
            price,
            userId,
            date,
        });
        // TODO: insert Bid history with using AuctionHistoryService?
    }

}
