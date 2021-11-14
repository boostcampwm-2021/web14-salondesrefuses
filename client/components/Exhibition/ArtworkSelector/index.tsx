import React, { useEffect, useState } from 'react';

import { Artwork } from 'interfaces';
import {
    useSelectedImageState,
    useEditorImageState,
} from '@store/editorImageState';
import { getAllArtworks } from '@utils/networking';
import { Container, Tiles, Check } from './style';

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

export default Selector;
