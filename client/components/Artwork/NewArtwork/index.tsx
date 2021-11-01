import React, { useRef, useEffect, useState } from 'react';

import { Button } from '@styles/common';
import ArtworkModal from '../ArtworkModal';
import { Container, Title, Form, Input } from './style';

interface NewArtworkProp {
    image: File;
}

const NewArtwork = ({ image }: NewArtworkProp) => {
    const backgroundImageRef = useRef<HTMLImageElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [modalPositionBottom, setModalPositionBottom] = useState('-53vh');
    const [modalInputData, setModalInputData] = useState<{
        [key: string]: number | string;
    }>({});

    const onClickHiddenModal = () => {
        console.log('hihi');
        setModalPositionBottom((pos) => '-50vh');
    };

    useEffect(() => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            backgroundImageRef.current!.src = e.target!.result as string;
            imageRef.current!.src = e.target!.result as string;
        };
        fileReader.readAsDataURL(image);

        document.body.style.overflow = 'hidden';
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
                />
            </Container>
            <img ref={backgroundImageRef} src="" alt="background" />
        </>
    );
};

export default NewArtwork;
