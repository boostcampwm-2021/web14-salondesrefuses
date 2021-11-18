import React, { useState } from 'react';
import styled from '@emotion/styled';
import Filter from '../Filter';

const filtering = ['거래', '입찰'];

const AuctionPage = () => {
    const [filter, setFilter] = useState<string>('거래');
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
