import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import { Button, Center } from '@styles/common';
import { AuctionCardProps } from '@const/card-type';
import Card from '@components/common/Card';
import { Filter } from '@components/Exhibition/style';
import { getAuctions } from '@utils/networking';
import RequireLoginModal from '@components/common/RequireLoginModal';
import useHandleRequireLoginModal from '@hooks/useHandleRequireLoginModal';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import parseCookie from '@utils/parseCookie';
import { useRef } from 'react';

let accessToken: string | undefined;

const AuctionList = () => {
    const [onSelect, setOnSelect] = useState('Popular');
    const [auctionItems, setAuctionItems] = useState<AuctionCardProps[]>([]);
    const [page, setPage] = useState(0);
    const { requireLoginModal, onClickPostArtworkWithoutLogin, closeModal } =
        useHandleRequireLoginModal();
    const gridRef = useInfiniteScroll(() => {
        setPage((page) => page + 1);
    }, auctionItems);

    useEffect(() => {
        accessToken = parseCookie()('accessToken');
    }, []);

    useEffect(() => {
        getAuctions(onSelect.toLowerCase(), page).then((res) =>
            setAuctionItems([...auctionItems, ...res.data]),
        );
    }, [page]);

    useEffect(() => {
        getAuctions(onSelect.toLowerCase(), page).then((res) =>
            setAuctionItems(res.data),
        );
    }, [onSelect]);

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
        <>
            <Container>
                <Title>
                    {buildFilterWrapper()}
                    {accessToken ? (
                        <Link href="artwork/post">
                            <BlackButton>Post Artwork</BlackButton>
                        </Link>
                    ) : (
                        <BlackButton onClick={onClickPostArtworkWithoutLogin}>
                            Post Artwork
                        </BlackButton>
                    )}
                </Title>
                <Grid ref={gridRef}>
                    {auctionItems.map((item, idx) => {
                        return <Card width="lg" content={item} key={idx} />;
                    })}
                </Grid>
            </Container>
            {requireLoginModal && <RequireLoginModal close={closeModal} />}
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
    width: 100%;
    margin-bottom: 45px;
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
    }

    & button {
        margin: 0 30px 0 30px;
        box-sizing: content-box;
    }
`;

export default AuctionList;
