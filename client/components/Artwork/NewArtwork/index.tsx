import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { ReadStream } from 'tty';

interface NewArtworkProp {
    image: File;
}

const NewArtwork = ({ image }: NewArtworkProp) => {
    const imageRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            imageRef.current!.src = e.target!.result as string;
        };
        fileReader.readAsDataURL(image);
    }, []);

    return (
        <Container>
            <img ref={imageRef} src="" alt="preview" />
        </Container>
    );
};

const Container = styled.div``;

export default NewArtwork;
