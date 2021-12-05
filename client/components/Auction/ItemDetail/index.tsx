import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';

import AboutArtist from '../AboutArtist';
import Trend from '../Trend';
import ArtworkDetail from '../ArtworkDetail';
import { Auction } from 'interfaces';
import useAuctionSocketState from '@store/auctionSocketState';
import { setColorFromImage } from '@utils/setColorFromImage';
const BidTable = dynamic(() => import('../BidTable'), { ssr: false });

export type trendHistory = {
    bidder: {
        name: string;
    };
    price: string;
    biddedAt: string;
};

const ItemDetail = ({ auction, image }: { auction: Auction; image: string }) => {
    const [socket] = useAuctionSocketState();
    const [isBlack, setIsBlack] = useState(true);

    const { id, artwork, artist, auctionHistories, price } = auction;
    const { title, type } = artwork;
    const trendHistoryList = JSON.parse(JSON.stringify(auctionHistories))
        .sort((a: trendHistory, b: trendHistory) => Number(b?.price) - Number(a?.price))
        .slice(0, LATEST_SIX);

    useEffect(() => {
        socket.emit('@auction/enter', id);
        setColorFromImage(image).then((res) => setIsBlack(res));

        return () => {
            socket.emit('@auction/leave', id);
            socket.offAny();
        };
    }, []);

    return (
        <Container>
            <Summary isBlack={isBlack}>
                <h1>{title}</h1>
                <span>{type}</span>
            </Summary>
            <AboutArtist artist={artist} />
            <BidTable auction={auction} currentPrice={Number(price)} />
            <Trend trendHistoryList={trendHistoryList} />
            <ArtworkDetail artwork={artwork} />
        </Container>
    );
};

const LATEST_SIX = 6;

const Container = styled.section`
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 10px 0;
    position: relative;

    &::-webkit-scrollbar {
        display: none;
    }

    & > div {
        display: flex;
        width: 80%;
        max-width: 600px;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 10px;
        margin-top: 40px;
        box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.1);
    }
`;

const Summary = styled.section<{ isBlack: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 500;

    & > span,
    h1 {
        margin: 2px;
        color: ${({ isBlack }) => (isBlack ? 'black' : 'white')};
    }

    & > h1 {
        font: ${(props) => props.theme.font.textXl};
    }

    & > span {
        font: ${(props) => props.theme.font.textSm};
    }
`;

export default ItemDetail;
