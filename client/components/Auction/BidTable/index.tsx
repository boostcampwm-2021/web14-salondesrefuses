import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { GlobalContext } from '../../../store/GlobalStore';
import getRemainingTime from '../../../utils/getRemainingTime';
import { Auction } from 'interfaces';

const BidTable = ({ auction }: { auction: Auction }) => {
    const globalContext = useContext(GlobalContext);
    const { id, artwork, endAt } = auction;
    const { auctionSocket, eventSource } = globalContext!;

    const [price, setPrice] = useState<number>(Number(artwork.price));
    const [auctionDeadline, setAuctionDeadline] = useState<string | null>(null);

    const bidArtwork = () => {
        auctionSocket.emit('bid', {
            price,
            userId: 'userId',
            id
        });
        setPrice(prev => Number((prev + 0.01).toFixed(2)));
    };

    useEffect(() => {
        eventSource.onmessage = ({ data }) => {
            setAuctionDeadline(getRemainingTime(Number(data), new Date(endAt).getTime()));
        };
    }, [])

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
                <Button onClick={bidArtwork}>입찰 {price} ETH</Button>
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
