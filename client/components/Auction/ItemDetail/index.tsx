import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';

import AboutArtist from './AboutArtist';
import BidTable from '../BidTable';
import Trend from '../Trend';
import ArtworkDetail from './ArtworkDetail';
import { GlobalContext } from '../../../store/GlobalStore';
import { Auction } from 'interfaces';

const ItemDetail = ({ auction }: { auction: Auction }) => {
    const globalContext = useContext(GlobalContext);
    const { auctionSocket } = globalContext!;

    const { id, artwork, artist } = auction;
    const { title, type } = artwork;

    useEffect(() => {
        auctionSocket.emit('enter', id);

        return (() => {
            auctionSocket.emit('leave', id);
        });
    }, []);

    return (
        <Container>
            <Summary>
                {/*<span>전시회 이름</span>*/}
                <h1>{title}</h1>
                <span>{type}</span>
            </Summary>
            <AboutArtist artist={artist}/>
            <BidTable auction={auction}/>
            <Trend />
            <ArtworkDetail />
        </Container>
    );
};

const Container = styled.section`
    width: 100%;
    overflow: scroll;
    overflow-x: hidden;
    
    &::-webkit-scrollbar {
        width: 8px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: #BBBBBB;
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
