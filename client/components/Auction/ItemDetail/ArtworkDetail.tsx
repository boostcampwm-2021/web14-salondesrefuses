import React from 'react';
import styled from '@emotion/styled';

import { Artwork } from 'interfaces';
import { SpaceBetween } from '@styles/common';
import { Description } from '@components/Auction/ItemDetail/AboutArtist';

const ArtworkDetail = ({ artwork }: { artwork: Artwork }) => {
    const { title, type, description } = artwork;

    return (
        <Container>
            <Title>
                <h1>작품 상세 정보</h1>
            </Title>
            <Detail>
                <div>
                    <span>작품명:</span>
                    <span>{title}</span>
                </div>
                <div>
                    <span>작품 타입:</span>
                    <span>{type}</span>
                </div>
                <div>
                    <span>작품 설명:</span>
                    <Description>{description}</Description>
                </div>
            </Detail>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: auto;
    padding-left: 20px;

    & img {
        width: 32px;
        height: 32px;
    }
`;

const Title = styled.div`
    width: 90%;
    ${SpaceBetween}
    margin: 10px 0;

    & > h1 {
        font: ${(props) => props.theme.font.textMd};
        font-size: 1em;
    }

    & > button {
        background: none;
        border: none;
    }
`;

const Detail = styled.div`
    display: flex;
    flex-direction: column;
    font: ${(props) => props.theme.font.textSm};
    
    & > div {
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;
    }
    
    & span {
        margin-right: 10px;
    }
`;

export default ArtworkDetail;
