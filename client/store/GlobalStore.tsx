import { createContext, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

type GlobalContext = {
    auctionSocket: Socket;
    eventSource: EventSource;
}

export const GlobalContext = createContext<GlobalContext | null>(null);

export const GlobalStore = (props: { children: ReactNode }) => {
    const auctionSocket = io(`${process.env.BASE_URL}/auction`, {
        path: '/socket.io'
    });
    const eventSource = new EventSource(`${process.env.API_SERVER_URL}/sse`);

    return (
        <GlobalContext.Provider value={{ auctionSocket, eventSource }}>
            {props.children}
        </GlobalContext.Provider>
    )
};
