import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import curations from '@const/curations';
import CarouselItem from '../CarouselItem.tsx';

const AuctionCarousel = () => {
    return (
        <SlideWrapper>
            <CarouselSlider {...settings}>
                {curations.map((curation) => {
                    return <CarouselItem curation={curation} key={curation.id} />;
                })}
            </CarouselSlider>
        </SlideWrapper>
    );
};

const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
    lazyLoad: 'progressive',
    fade: true,
};

const SlideWrapper = styled.section`
    position: relative;
    background-color: ${(props) => props.theme.color.background};
    width: 100vw;
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
