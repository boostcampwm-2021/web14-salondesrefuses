import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Filter from '../Filter';
import { getUserArtworkTrades } from '@utils/networking';
import { AuctionCardProps } from '@const/card-type';

const filtering = ['거래', '입찰'];

const AuctionPage = () => {
    const [auctions, setAuctions] = useState<AuctionCardProps[]>([]);
    const [filter, setFilter] = useState<string>('거래');

    useEffect(() => {
        getUserArtworkTrades(filter).then((res) => {
            setAuctions(res.data);
        });
    }, [filter]);

    return (
        <Container>
            <Filter
                filtering={filtering}
                current={filter}
                filterHandler={(s: string) => {
                    setFilter(s);
                }}
            />
        </Container>
    );
};

const Container = styled.div``;

export default AuctionPage;
