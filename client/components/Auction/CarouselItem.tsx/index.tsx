import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import { BlackButton, SpaceAround } from '@styles/common';

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
            <img src={curation.thumbnailImage} alt={curation.title} />
            <Content>
                <div>
                    <h1>{curation.title}</h1>
                    <span>{curation.content}</span>
                    <Link href={curation.url}>Check Curation</Link>
                </div>
                <div>
                    <PreviewImage src={curation.thumbnailImage} alt={curation.title} />
                </div>
            </Content>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;

    & > img {
        width: 100%;
        max-height: 530px;
        object-fit: cover;
        filter: blur(50px);
        tranform: scale(1.2);
    }

    & a {
        border-bottom: 1px solid black;
    }
`;

const Content = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    ${SpaceAround};
    font-family: 'Mixed Regular';

    & span {
        display: block;
        margin-bottom: 20px;
    }

    & > div:nth-of-type(1) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }
`;

const PreviewImage = styled.img`
    max-height: 400px;
    max-width: 35vw;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;
`;

export default CarouselItem;
