import React from 'react';
import styled from '@emotion/styled';

import chevronLeftIcon from '@assets/images/chevron-left.png';
import chevronRightIcon from '@assets/images/chevron-right.png';
import { Artwork } from 'interfaces';

interface SliderProp {
    selectedImages: Artwork[];
}

const ImageSlider = ({ selectedImages }: SliderProp) => {
    return (
        <Container>
            <LeftButton>
                <img src={chevronLeftIcon.src} alt="left button" />
            </LeftButton>

            <RightButton>
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
    left: 0px;
`;

const RightButton = styled(Button)`
    right: 0px;
`;

export default ImageSlider;
