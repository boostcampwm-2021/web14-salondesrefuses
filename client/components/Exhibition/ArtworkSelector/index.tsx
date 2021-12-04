import React from 'react';

import { Artwork } from 'interfaces';
import { useSelectedImageState, useEditorImageState } from '@store/editorImageState';
import { getAllArtworks } from 'service/networking';
import { Container, Tiles, Check } from './style';
import createResource from '@utils/createResource';
import ErrorBoundary from '@components/common/ErrorBoundary';
import CSuspense from '@components/common/Suspense';
import Fallback from '@components/common/Fallback';

const resource = createResource(getAllArtworks());

const Selector = () => {
    const images: Artwork[] = resource.read().data;
    const [selectedImages, setSelectedImages] = useSelectedImageState();
    const [_, setEditorImageState] = useEditorImageState();

    const onClickImage = (id: number) => {
        return () => {
            const idx = selectedImages.findIndex((image) => image.id === id);
            if (idx < 0) setSelectedImages([...selectedImages, images.find((image) => image.id === id)!]);
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
            <ErrorBoundary fallback={<div>...failed</div>}>
                <CSuspense fallback={<Fallback />}>
                    <Tiles>
                        {images.map((image) => {
                            const selected = selectedImages.findIndex((img) => img.id === image.id);
                            return (
                                <div key={image.id} onClick={onClickImage(image.id)}>
                                    <img src={image.originalImage} alt={image.title} />
                                    {selected >= 0 && <Check>Selected</Check>}
                                </div>
                            );
                        })}
                    </Tiles>
                </CSuspense>
            </ErrorBoundary>
        </Container>
    );
};

export default Selector;
