import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import Card from '@components/common/Card';
import { AuctionCardProps } from '@const/card-type';
import { Button, Center } from '@styles/common';
import { Filter } from '@components/Exhibition/style';
import { Grid } from '@components/common/Card/style';
import { ToastMsg } from '@const/toast-message';
import { getAuctions } from 'service/networking';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import useSessionState from '@store/sessionState';
import useModalState from '@store/modalState';

const AuctionList = () => {
    const session = useSessionState().contents;
    const [_, setModalState] = useModalState();
    const [onSelect, setOnSelect] = useState('Popular');
    const [auctionItems, setAuctionItems] = useState<AuctionCardProps[]>([]);
    const [page, setPage] = useState(0);
    const gridRef = useInfiniteScroll(() => {
        setPage((page) => page + 1);
    }, auctionItems);

    useEffect(() => {
        setAuctionItems([]);
        setPage(0);
    }, [onSelect]);

    useEffect(() => {
        getAuctions(onSelect.toLowerCase(), page).then((res) => setAuctionItems([...auctionItems, ...res.data]));
    }, [page, onSelect]);

    const onClickFilter = ({ currentTarget }: React.MouseEvent) => {
        setOnSelect(currentTarget.textContent || 'Newest');
    };

    const onClickButtonWithoutSession = () => {
        setModalState({
            show: true,
            onConfirm: () => {},
            content: ToastMsg.NOT_LOGGINED,
        });
    };

    const buildFilterWrapper = () => {
        return (
            <FilterWrapper>
                <div>
                    <Filter onClick={onClickFilter} select={onSelect === 'Newest'}>
                        Newest
                    </Filter>
                </div>
                <div>
                    <Filter onClick={onClickFilter} select={onSelect === 'Popular'}>
                        Popular
                    </Filter>
                </div>
            </FilterWrapper>
        );
    };

    return (
        <>
            <Container>
                <Title>
                    {buildFilterWrapper()}
                    {session ? (
                        <Link href="artwork/post">
                            <BlackButton>Post Artwork</BlackButton>
                        </Link>
                    ) : (
                        <BlackButton onClick={onClickButtonWithoutSession}>Post Artwork</BlackButton>
                    )}
                </Title>
                <Grid ref={gridRef}>
                    {auctionItems.map((item, idx) => {
                        return <Card width="lg" content={item} key={idx} />;
                    })}
                </Grid>
            </Container>
        </>
    );
};

const Container = styled.div`
    ${Center}
    flex-direction: column;
    width: 80%;
    max-width: 1180px;
    margin-top: 50px;

    & h1 {
        font: ${(props) => props.theme.font.textEnMd};
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
    width: 105%;
    margin-bottom: 45px;
`;

const BlackButton = styled(Button)`
    color: ${(props) => props.theme.color.title};
    border-color: ${(props) => props.theme.color.title};
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
    }

    & button {
        margin: 0 30px 0 30px;
        box-sizing: content-box;
    }
`;

export default AuctionList;
