import React from 'react';
import styled from '@emotion/styled';

import { AuctionCardProps } from '@const/card-type';
import Card from '@components/common/Card';

const AuctionList = ({ items }: { items: AuctionCardProps[] }) => {
    return (
        <Container>
            {items &&
                items.map((card) => {
                    <Card width={'md'} content={card} key={card.id} />;
                })}
        </Container>
    );
};

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
`;

export default AuctionList;
