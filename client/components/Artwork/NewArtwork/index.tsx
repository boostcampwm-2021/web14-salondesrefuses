import React, { useEffect } from 'react';

import { Button } from '@styles/common';
import ArtworkModal from '../ArtworkModal';
import { Container, Title, Form, Input } from './style';
import usePreviewImage from '@hooks/usePreviewImage';
import useInputArtwork from '@hooks/useInputArtwork';
import useControlModalPosition from '@hooks/useControlModalPosition';

interface NewArtworkProp {
    image: File;
}

const NewArtwork = ({ image }: NewArtworkProp) => {
    const { onClickDone, onChangeTitleInput, onChangeTypeInput, titleInput, typeInput, handleModalInput } =
        useInputArtwork(image);
    const { backgroundImageRef, imageRef } = usePreviewImage(image);
    const { modalPositionTop, handleModalPosition, onClickHiddenModal } = useControlModalPosition();

    const onKeyDownTab = (e: React.KeyboardEvent) => {
        if (e.key === 'Tab') e.preventDefault();
    };

    return (
        <>
            <Container>
                <Title>
                    <h1>New Artwork</h1>
                    <Button onClick={onClickDone}>Done</Button>
                </Title>
                <div>
                    <img ref={imageRef} src="" alt="preview" />
                </div>
                <Form>
                    <Input>
                        <span>Title</span>
                        <input
                            type="text"
                            placeholder="Title of artwork..."
                            value={titleInput}
                            onChange={onChangeTitleInput}
                        />
                    </Input>
                    <Input>
                        <span>Type</span>
                        <input
                            type="text"
                            placeholder="ex) Photography ..."
                            value={typeInput}
                            onChange={onChangeTypeInput}
                            onKeyDown={onKeyDownTab}
                        />
                    </Input>
                </Form>
                <ArtworkModal
                    handleModalInput={handleModalInput}
                    position={modalPositionTop}
                    handleModalPosition={handleModalPosition}
                    onClick={onClickHiddenModal}
                />
            </Container>
            <img ref={backgroundImageRef} src="" alt="background" />
        </>
    );
};

export default NewArtwork;
