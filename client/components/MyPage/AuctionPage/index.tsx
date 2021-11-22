import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Filter from '../Filter';
import { getUserArtworkTrades } from '@utils/networking';
import { AuctionCardProps } from '@const/card-type';

const filtering = ['거래', '입찰'];

const AuctionPage = () => {
    const [auctions, setAuctions] = useState<AuctionCardProps[]>([]);

    useEffect(() => {
        getUserArtworkTrades('transaction').then((res) => {
            setAuctions(res.data);
        });
    }, []);

    return <Container></Container>;
};

const Container = styled.div``;

export default AuctionPage;
