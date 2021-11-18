import { atom, useRecoilState } from 'recoil';
import { io, Socket } from 'socket.io-client';

const auctionSocketState = atom<Socket>({
    key: '@auction/socket',
    default: io(`${process.env.BASE_URL}/auction`, {
        path: '/socket.io',
    }),
});

const useAuctionSocketState = () => useRecoilState(auctionSocketState);

export default useAuctionSocketState;
