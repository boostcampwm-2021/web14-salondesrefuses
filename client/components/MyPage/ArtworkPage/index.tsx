import React, { useState } from 'react';
import styled from '@emotion/styled';

import Tiles from '@components/Artwork/Tiles';
import Filter from '../Filter';
import BoughtArtworkPage from './BoughtArtworkPage';

const ArtworkPage = () => {
    const [filter, setFilter] = useState<string>('등록한 작품');

    const onClickFilter = (item: string) => {
        setFilter(item);
    };

    return (
        <Container>
            <Filter filtering={filtering} current={filter} filterHandler={onClickFilter} />
            {filter === '등록한 작품' ? <Tiles align="flex-start" /> : <BoughtArtworkPage />}
        </Container>
    );
};

const filtering = ['등록한 작품', '구매한 작품'];

const Container = styled.div``;

export default ArtworkPage;
