import React, { useRef, useEffect, useState } from 'react';

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
    const { onClickDone, titleInputRef, typeInputRef, setModalInputData } =
        useInputArtwork(image);
    const { backgroundImageRef, imageRef } = usePreviewImage(image);
    const { modalPositionBottom, setModalPositionBottom } =
        useControlModalPosition();

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
                            ref={titleInputRef}
                        />
                    </Input>
                    <Input>
                        <span>Type</span>
                        <input
                            type="text"
                            placeholder="Photography ..."
                            ref={typeInputRef}
                        />
                    </Input>
                </Form>
                <ArtworkModal
                    setData={setModalInputData}
                    position={modalPositionBottom}
                    setPosition={setModalPositionBottom}
                />
            </Container>
            <img ref={backgroundImageRef} src="" alt="background" />
        </>
    );
};

export default NewArtwork;
