import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { Artwork } from 'interfaces';
import useEditorImageState from '@store/editorImageState';
import { getAllArtworks } from '@utils/networking';

const Selector = () => {
    const [images, setImages] = useState<Artwork[]>([]);
    const [selectedImages, setSelectedImages] = useEditorImageState();

    useEffect(() => {
        getAllArtworks().then((res) => setImages(res.data));
    }, []);

    const onClickImage = (id: number) => {
        return () => {
            const idx = selectedImages.findIndex((image) => image.id === id);
            if (idx < 0)
                setSelectedImages([
                    ...selectedImages,
                    images.find((image) => image.id === id)!,
                ]);
            else {
                const tmpSelectedImages = [...selectedImages];
                tmpSelectedImages.splice(idx, 1);
                setSelectedImages(tmpSelectedImages);
            }
        };
    };

    return (
        <Container>
            <Tiles>
                {images.map((image) => {
                    return (
                        <div key={image.id} onClick={onClickImage(image.id)}>
                            <img src={image.originalImage} alt={image.title} />
                        </div>
                    );
                })}
            </Tiles>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: calc(100% - 54px);
    padding: 20px;

    background: #ededed;
`;

const Tiles = styled.div`
    column-count: 3;
    width: 100%;

    & > div {
        display: inline-block;
        justify-content: center;
        margin: 0 0 1rem;
    }

    & img {
        width: 100px;
    }
`;

export default Selector;
