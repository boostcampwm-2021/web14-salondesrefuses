import React, { useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import { Button, Center } from '@styles/common';
import { AuctionCardProps } from '@const/card-type';
import Card from '@components/Card';
import { Filter } from 'pages/exhibition/style';

const DUMMY_DATA: Array<AuctionCardProps> = [
    {
        title: 'test',
        description: 'this is description',
        artist: 'imnotmoon',
        imgSrc: 'https://d7hftxdivxxvm.cloudfront.net/?resize_to=fit&width=210&height=276&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FVju3jVJD5yaSEb1vTQbA1w%2Flarge.jpg',
        price: 1.23,
        id: 2,
    },
    {
        title: 'test',
        description: 'this is description',
        artist: 'imnotmoon',
        imgSrc: 'https://d7hftxdivxxvm.cloudfront.net/?resize_to=fit&width=210&height=276&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FVju3jVJD5yaSEb1vTQbA1w%2Flarge.jpg',
        price: 1.23,
        id: 3,
    },
    {
        title: 'test',
        description: 'this is description',
        artist: 'imnotmoon',
        imgSrc: 'https://d7hftxdivxxvm.cloudfront.net/?resize_to=fit&width=210&height=276&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FVju3jVJD5yaSEb1vTQbA1w%2Flarge.jpg',
        price: 1.23,
        id: 4,
    },
    {
        title: 'test',
        description: 'this is description',
        artist: 'imnotmoon',
        imgSrc: 'https://d7hftxdivxxvm.cloudfront.net/?resize_to=fit&width=210&height=276&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FVju3jVJD5yaSEb1vTQbA1w%2Flarge.jpg',
        price: 1.23,
        id: 5,
    },
    {
        title: 'test',
        description: 'this is description',
        artist: 'imnotmoon',
        imgSrc: 'https://d7hftxdivxxvm.cloudfront.net/?resize_to=fit&width=210&height=276&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FVju3jVJD5yaSEb1vTQbA1w%2Flarge.jpg',
        price: 1.23,
        id: 1,
    },
    {
        title: 'test',
        description: 'this is description',
        artist: 'imnotmoon',
        imgSrc: 'https://d7hftxdivxxvm.cloudfront.net/?resize_to=fit&width=210&height=276&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FVju3jVJD5yaSEb1vTQbA1w%2Flarge.jpg',
        price: 1.23,
        id: 2,
    },
    {
        title: 'test',
        description: 'this is description',
        artist: 'imnotmoon',
        imgSrc: 'https://d7hftxdivxxvm.cloudfront.net/?resize_to=fit&width=210&height=276&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FVju3jVJD5yaSEb1vTQbA1w%2Flarge.jpg',
        price: 1.23,
        id: 2,
    },
];

const AuctionList = () => {
    const [onSelect, setOnSelect] = useState('Popular');

    const onClickFilter = ({ currentTarget }: React.MouseEvent) => {
        setOnSelect(currentTarget.textContent || 'Newest');
    };

    return (
        <Container>
            <Title>
                <h1>지금 판매중인 작품</h1>
                <Link href="artwork/post">
                    <BlackButton>Post Artwork</BlackButton>
                </Link>
            </Title>
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
            <Grid>
                {DUMMY_DATA.map((item) => {
                    return <Card width="lg" content={item} />;
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
`;

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;

    & h1 {
        font: ${(props) => props.theme.font.textXl};
        color: ${(props) => props.theme.color.title};
    }
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
    margin-bottom: 50px;
    align-self: flex-start;
    display: flex;
    justify-content: space-between;

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
