import React, { useRef } from 'react';
import styled from '@emotion/styled';

import chevronLeftIcon from '@assets/images/chevron-left.png';
import chevronRightIcon from '@assets/images/chevron-right.png';
import { useEditorImageState, useSelectedImageState } from '@store/editorImageState';

const ImageSlider = () => {
    const [selectedImages] = useSelectedImageState();
    const [editorImageState, setEditorImageState] = useEditorImageState();
    const imageSliderRef = useRef<HTMLDivElement | null>(null);

    const onClickImage = (id: number) => {
        return () => {
            const image = selectedImages.find((img) => img.id === id);
            if (!image) return;
            setEditorImageState([...editorImageState, image]);
        };
    };

    const onClickLeftButton = (e: React.MouseEvent) => {
        if (!imageSliderRef.current) return;
        imageSliderRef.current.scroll({ left: imageSliderRef.current.scrollLeft - 300, behavior: 'smooth' });
    };

    const onClickRightButton = (e: React.MouseEvent) => {
        if (!imageSliderRef.current) return;
        imageSliderRef.current.scroll({ left: imageSliderRef.current.scrollLeft + 300, behavior: 'smooth' });
    };

    return (
        <Container>
            <LeftButton onClick={onClickLeftButton}>
                <img src={chevronLeftIcon.src} alt="left button" />
            </LeftButton>
            <ImageWrapper ref={imageSliderRef}>
                {selectedImages.map((image) => {
                    return (
                        <Image key={image.id} onClick={onClickImage(image.id)}>
                            <img src={image.originalImage} alt={image.title} draggable={false} />
                        </Image>
                    );
                })}
            </ImageWrapper>
            <RightButton onClick={onClickRightButton}>
                <img src={chevronRightIcon.src} alt="right button" />
            </RightButton>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 150px;
    background: ${(props) => props.theme.color.background};
    margin-bottom: 20px;
    position: relative;
`;

const Button = styled.div`
    width: 30px;
    height: 100%;
    position: absolute;
    top: 0px;
    background-color: rgba(41, 40, 65, 0.2);
    backdrop-filter: blur(20px);
    display: flex;
    align-items: center;
`;

const LeftButton = styled(Button)`
    cursor: pointer;
    left: 0px;
`;

const RightButton = styled(Button)`
    cursor: pointer;
    right: 0px;
`;

const ImageWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 0 50px;
    display: flex;
    gap: 20px;
    align-items: center;
    overflow-x: scroll;

    ::-webkit-scrollbar {
        display: none;
    }
`;

const Image = styled.div`
    & img {
        max-height: 130px;
    }
`;

export default ImageSlider;
