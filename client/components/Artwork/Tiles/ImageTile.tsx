import React, { Suspense } from 'react';
import styled from '@emotion/styled';

const ImageTile = ({ src }: { src: string }) => {
    return (
        <Container>
            <img src={src} />
        </Container>
    );
};

const Container = styled.div`
    & img {
        width: 200px;
        filter: grayscale(100%);

        &:hover {
            filter: grayscale(0%);
            transition: all 1s;
        }
    }
`;

export default ImageTile;
