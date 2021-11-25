import React from 'react';
import styled from '@emotion/styled';
import createResource from '@utils/createResource';
import { getSingleArtwork } from 'service/networking';

interface Curation {
    id: number;
    title: string;
    content: string;
    artworks: number[];
    url: string;
    thumbnailImage: string;
}

const CarouselItem = ({ curation }: { curation: Curation }) => {
    return <Container></Container>;
};

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

export default CarouselItem;
