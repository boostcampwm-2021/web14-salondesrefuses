import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';

import AboutArtist from '../AboutArtist';
import BidTable from '../BidTable';
import Trend from '../Trend';
import ArtworkDetail from '../ArtworkDetail';
import { Auction } from 'interfaces';
import useAuctionSocketState from '@store/auctionSocketState';

export type trendHistory = {
    bidder: {
        name: string;
    };
    price: string;
    biddedAt: string;
};

const ItemDetail = ({ auction }: { auction: Auction }) => {
    const [socket] = useAuctionSocketState();

    const { id, artwork, artist, auctionHistories, price } = auction;
    const { title, type } = artwork;
    const trendHistoryList = JSON.parse(JSON.stringify(auctionHistories))
        .sort(
            (a: trendHistory, b: trendHistory) =>
                Number(b?.price) - Number(a?.price),
        )
        .slice(0, 6);

    useEffect(() => {
        socket.emit('@auction/enter', id);

        return () => {
            socket.emit('@auction/leave', id);
        };
    }, []);

    return (
        <Container>
            <Summary>
                <h1>{title}</h1>
                <span>{type}</span>
            </Summary>
            <AboutArtist artist={artist} />
            <BidTable
                auction={auction}
                currentPrice={Number(price)}
            />
            <Trend trendHistoryList={trendHistoryList} />
            <ArtworkDetail artwork={artwork} />
        </Container>
    );
};

const Container = styled.section`
    width: 100%;
    overflow: scroll;
    overflow-x: hidden;
    padding: 10px 0;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background: #bbbbbb;
        border-radius: 10px;
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

const Summary = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 500;

    & > span,
    h1 {
        margin: 2px;
    }

    & > h1 {
        font: ${(props) => props.theme.font.textXl};
    }

    & > span {
        font: ${(props) => props.theme.font.textSm};
    }
`;

export default ItemDetail;
