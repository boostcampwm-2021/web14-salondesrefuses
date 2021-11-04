import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const AuctionCarousel = () => {
    return (
        <SlideWrapper>
            <CarouselSlider {...settings}>
                <div style={{ backgroundColor: 'black' }}>1</div>
                <div style={{ backgroundColor: 'grey' }}>2</div>
                <div style={{ backgroundColor: 'offwhite' }}>3</div>
            </CarouselSlider>
        </SlideWrapper>
    );
};

const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 1200,
};

const SlideWrapper = styled.section`
    position: relative;
    background-color: ${(props) => props.theme.color.background};
    width: 100%;
    height: 500px;
`;

const CarouselSlider = styled(Slider)`
    width: 100%;
    height: 100%;

    & > div {
        height: 100%;
        width: 100%;
    }
`;

export default AuctionCarousel;
