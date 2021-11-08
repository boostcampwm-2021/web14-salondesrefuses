import React from 'react';
import styled from '@emotion/styled';

import { SpaceBetween } from '@styles/common';

const ArtworkDetail = () => {
    return (
        <Container>
            <Title>
                <h1>작품 상세 정보</h1>
            </Title>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justfiy-content: flex-start;
    align-items: center;
    height: 500px; // for test

    & img {
        width: 32px;
        height: 32px;
    }
`;

const Title = styled.div`
    width: 90%;
    ${SpaceBetween}

    & > h1 {
        font: ${(props) => props.theme.font.textEnBase};
    }

    & > button {
        background: none;
        border: none;
    }
`;

export default ArtworkDetail;
