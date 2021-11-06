import styled from '@emotion/styled';
import Slider from 'react-slick';
import Image from 'next/image';

export const SlideWrapper = styled.section`
    position: relative;
    background-color: ${(props) => props.theme.color.background};
    width: 100%;
    height: 500px;
`;

export const CarouselSlider = styled(Slider)`
    width: 100%;
    height: 100%;

    & > div {
        height: 100%;더했습
        width: 100%;
    }
    .slick-slice div {
        height: 100%;
    }
`;
interface carouselContentInterface {
    imgSrc: string;
}
export const CarouselContent = styled.div<carouselContentInterface>`
    background-image: url(${(props) => props.imgSrc});
    width: 100%;
    height: 500px;
    background-size: cover;
    & > div {
        width: 100%;
        height: 100%;
        background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.46) 18.75%,
            #ffffff 100%
        );
        backdrop-filter: blur(15px);
    }
`;

export const StyledImage = styled.img`
    max-width: 400px;
    max-height: 300px;
    width: auto;
    height: auto;
`;

export const Title = styled.p`
    position: absolute;
    font: ${(props) => props.theme.font.textEnTitle};
    z-index: 20;
    width: 100%;
    text-align: left;
    margin: 30px 0 0 230px;
`;
