import React from 'react';
import styled from '@emotion/styled';
import createResource from '@utils/createResource';
import { getSingleArtwork } from 'service/networking';
import { title } from 'process';

interface Curation {
    id: number;
    title: string;
    content: string;
    artworks: number[];
    url: string;
    thumbnailImage: string;
}

const CarouselItem = ({ curation }: { curation: Curation }) => {
    return (
        <Container>
            <img src={curation.thumbnailImage} alt={title} />
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100%;

    & > img {
        width: 100%;
        max-height: 500px;
        object-fit: cover;
        filter: blur(50px);
        tranform: scale(1.2);
    }
`;

export default CarouselItem;
