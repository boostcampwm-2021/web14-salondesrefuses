import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { getUserArtworkTrades } from 'service/networking';
import { AuctionCardProps } from '@const/card-type';

const AuctionPage = () => {
    const [_, setAuctions] = useState<AuctionCardProps[]>([]);

    useEffect(() => {
        getUserArtworkTrades('transaction').then((res) => {
            setAuctions(res.data);
        });
    }, []);

    return <Container></Container>;
};

const Container = styled.div``;

export default AuctionPage;
