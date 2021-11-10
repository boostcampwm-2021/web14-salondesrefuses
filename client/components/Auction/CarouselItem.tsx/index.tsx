import React from 'react';
import styled from '@emotion/styled';

interface Curation {
    id: number;
    title: string;
    content: string;
    thumbnailImage: string;
}

const CarouselItem = ({ curation }: { curation: Curation }) => {
    return <Container></Container>;
};

const Container = styled.div``;

export default CarouselItem;
