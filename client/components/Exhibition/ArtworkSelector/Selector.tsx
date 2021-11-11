import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { Artwork } from 'interfaces';
import {
    useSelectedImageState,
    useEditorImageState,
} from '@store/editorImageState';
import { getAllArtworks } from '@utils/networking';
import { Center } from '@styles/common';

const Selector = () => {
    const [images, setImages] = useState<Artwork[]>([]);
    const [selectedImages, setSelectedImages] = useSelectedImageState();
    const [_, setEditorImageState] = useEditorImageState();

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
            setEditorImageState([]);
        };
    };

    return (
        <Container>
            <Tiles>
                {images.map((image, idx) => {
                    const selected = selectedImages.findIndex(
                        (img) => img.id === image.id,
                    );
                    return (
                        <div key={image.id} onClick={onClickImage(image.id)}>
                            <img src={image.originalImage} alt={image.title} />
                            {selected >= 0 && <Check>Selected</Check>}
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
        position: relative;
    }

    & img {
        width: 100px;
    }
`;

const Check = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: calc(100% - 5px);
    background-color: rgba(0, 0, 0, 0.4);
    ${Center};
    font: ${(props) => props.theme.font.textEnBase};
    color: white;
`;

export default Selector;
