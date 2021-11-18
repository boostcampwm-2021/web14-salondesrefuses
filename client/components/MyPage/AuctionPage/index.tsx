import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Filter from '../Filter';
import { getUserArtworkTrades } from '@utils/networking';

const filtering = ['거래', '입찰'];

const AuctionPage = () => {
    const [filter, setFilter] = useState<string>('거래');

    useEffect(() => {
        getUserArtworkTrades(filter).then((res) => {
            setFilter(res.data);
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
