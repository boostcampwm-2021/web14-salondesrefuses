import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { Auction } from 'interfaces';
import useAuctionSocketState from '@store/auctionSocketState';
import { trendHistory } from '@components/Auction/ItemDetail';
import { getRemainingTime } from '@utils/time';

let eventSource: EventSource | null;

const BidTable = ({
    auction,
    currentPrice,
}: {
    auction: Auction;
    currentPrice: number;
}) => {
    const { id, artwork, endAt } = auction;
    const [socket] = useAuctionSocketState();

    const [price, setPrice] = useState<number>(
        currentPrice ? Number((currentPrice + 0.01).toFixed(2)) : artwork.price,
    );
    const [auctionDeadline, setAuctionDeadline] = useState<string | null>(null);

    const bidArtwork = () => {
        socket.emit('@auction/bid', {
            id,
            bidderName: 'userId',
            price,
            biddedAt: Date.now(),
        });
    };

    useEffect(() => {
        socket.on('@auction/bid', (data: trendHistory) => {
            const currentBidPrice = Number(data.price);
            setPrice(Number((currentBidPrice + 0.01).toFixed(2)));
        });

        eventSource = new EventSource(`${process.env.API_SERVER_URL}/sse`);

        eventSource.onmessage = ({ data }) => {
            setAuctionDeadline(
                getRemainingTime(Number(data), new Date(endAt).getTime()),
            );
        };
    }, []);

    return (
        <Container>
            <Timer>
                <span>경매 마감 기한</span>
                <b>{auctionDeadline}</b>
            </Timer>
            <Bid>
                <div>
                    <span>현재가격</span>
                    <b>{price} ETH</b>
                </div>
                <Button onClick={() => bidArtwork()}>입찰 {price} ETH</Button>
            </Bid>
        </Container>
    );
};

const Container = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
`;

const Timer = styled.div`
    display: flex;
    gap: 10px;
    width: 90%;

    & > b {
        font: ${(props) => props.theme.font.textSm};
        font-size: 1em;
    }
`;

const Bid = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;

    & b,
    span {
        display: block;
        min-width: 65px;
        font: ${(props) => props.theme.font.textMd};
        font-size: 15px;
        margin-top: 5px;
    }
`;

const Button = styled.button`
    border-radius: 11px;
    border: none;
    background-color: rgba(255, 255, 255, 0.5);
    width: 150px;
    height: 45px;
    margin-top: 5px;
    transition: all 0.3s ease;

    &:hover {
        background-color: rgba(98, 227, 98, 0.6);
        transition: all 0.3s ease;
    }
`;

export default BidTable;
