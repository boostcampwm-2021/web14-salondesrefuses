import React, { Suspense } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';

const ImageTile = ({ image }: { image: StaticImageData }) => {
    return (
        <Container>
            <Image src={image} />
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
