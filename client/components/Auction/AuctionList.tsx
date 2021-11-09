import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import { Button, Center } from '@styles/common';
import { AuctionCardProps } from '@const/card-type';
import Card from '@components/Card';
import { Filter } from '@components/Exhibition/style';
import { getAuctions } from '@utils/networking';

const AuctionList = () => {
    const [onSelect, setOnSelect] = useState('Popular');
    const [auctionItems, setAuctionItems] = useState<AuctionCardProps[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getAuctions(onSelect.toLowerCase(), page).then((res) =>
            setAuctionItems(res.data),
        );
    }, [onSelect, page]);

    const onClickFilter = ({ currentTarget }: React.MouseEvent) => {
        setOnSelect(currentTarget.textContent || 'Newest');
    };

    const buildFilterWrapper = () => {
        return (
            <FilterWrapper>
                <div>
                    <Filter
                        onClick={onClickFilter}
                        select={onSelect === 'Popular'}
                    >
                        Popular
                    </Filter>
                </div>
                <div>
                    <Filter
                        onClick={onClickFilter}
                        select={onSelect === 'Newest'}
                    >
                        Newest
                    </Filter>
                </div>
            </FilterWrapper>
        );
    };

    return (
        <Container>
            <Title>
                {buildFilterWrapper()}
                <Link href="artwork/post">
                    <BlackButton>Post Artwork</BlackButton>
                </Link>
            </Title>
            <h1>지금 판매중인 작품</h1>
            <Grid>
                {auctionItems.map((item) => {
                    return <Card width="lg" content={item} key={item.id} />;
                })}
            </Grid>
        </Container>
    );
};

const Container = styled.div`
    ${Center}
    flex-direction: column;
    width: 80%;
    margin-top: 50px;

    & h1 {
        font: ${(props) => props.theme.font.textXl};
        color: ${(props) => props.theme.color.title};
        margin: 0;
        align-self: flex-start;
        margin-bottom: 50px;
    }
`;

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 50px;
`;

const BlackButton = styled(Button)`
    color: ${(props) => props.theme.color.title};
    border-color: ${(props) => props.theme.color.title};
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 50px;
    margin-bottom: 45px;
`;

const FilterWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-self: flex-start;

    & div {
        border-left: 1px solid ${(props) => props.theme.color.placeholder};
    }

    & > div:first-of-type {
        border: none;
        & button {
            margin-left: 0;
            margin-right: 30px;
        }
    }

    & button {
        margin: 0 30px 0 30px;
        box-sizing: content-box;
    }
`;

export default AuctionList;
