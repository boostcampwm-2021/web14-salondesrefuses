import React, { useState, Suspense } from 'react';
import styled from '@emotion/styled';

import Tiles from '@components/Artwork/Tiles';
import Filter from '../Filter';
import BoughtArtworkPage from './BoughtArtworkPage';
import Fallback from '@components/common/Fallback';
import CSuspense from '@components/common/Suspense';

const ArtworkPage = () => {
    const [filter, setFilter] = useState<string>('등록한 작품');

    const onClickFilter = (item: string) => {
        setFilter(item);
    };

    return (
        <Container>
            <Filter filtering={filtering} current={filter} filterHandler={onClickFilter} />
            {filter === '등록한 작품' ? (
                <Suspense fallback={<Fallback />}>
                    <Tiles align="flex-start" />
                </Suspense>
            ) : (
                <BoughtArtworkPage />
            )}
        </Container>
    );
};

const filtering = ['등록한 작품', '보유중인 작품'];

const Container = styled.div``;

export default ArtworkPage;
