import React, { useRef, useEffect, useState } from 'react';

import { Button } from '@styles/common';
import ArtworkModal from '../ArtworkModal';
import { Container, Title, Form, Input } from './style';
import usePreviewImage from '@hooks/usePreviewImage';

interface NewArtworkProp {
    image: File;
}

const NewArtwork = ({ image }: NewArtworkProp) => {
    const { backgroundImageRef, imageRef } = usePreviewImage(image);
    const [modalPositionBottom, setModalPositionBottom] = useState('-53vh');
    const [modalInputData, setModalInputData] = useState<{
        [key: string]: number | string;
    }>({});

    const onClickHiddenModal = () => {
        console.log('hihi');
        setModalPositionBottom('-50vh');
    };

    const onWheelModal = (e: WheelEvent) => {
        if (e.deltaY > 30) {
            setModalPositionBottom('20vh');
            // document.removeEventListener('wheel', onWheelModal);
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.addEventListener('wheel', onWheelModal);
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, []);

    return (
        <>
            <Container>
                <Title>
                    <h1>New Artwork</h1>
                    <Button>Done</Button>
                </Title>
                <div>
                    <img ref={imageRef} src="" alt="preview" />
                </div>
                <Form>
                    <Input>
                        <span>Title</span>
                        <input type="text" placeholder="Title of artwork..." />
                    </Input>
                    <Input>
                        <span>Type</span>
                        <input type="text" placeholder="Photography ..." />
                    </Input>
                </Form>
                <ArtworkModal
                    setData={setModalInputData}
                    position={modalPositionBottom}
                    onClick={onClickHiddenModal}
                    setPosition={setModalPositionBottom}
                />
            </Container>
            <img ref={backgroundImageRef} src="" alt="background" />
        </>
    );
};

export default NewArtwork;
