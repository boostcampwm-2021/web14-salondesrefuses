import React from 'react';
import Image from 'next/image';

import { randomExhibitionType } from 'constants/fakeDatas';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
    CarouselSlider,
    SlideWrapper,
    CarouselContent,
    StyledImage,
} from './styles';

interface Props {
    ExhibitionsData: randomExhibitionType[];
}

const MainCarousel = ({ ExhibitionsData }: Props) => {
    return (
        <>
            <SlideWrapper>
                <CarouselSlider {...settings}>
                    {ExhibitionsData.map((exhibition) => {
                        console.log(exhibition);

                        return (
                            <CarouselContent
                                imgSrc={exhibition.thumbnail}
                                key={exhibition.id}
                            >
                                <div>
                                    <StyledImage
                                        src={exhibition.thumbnail}
                                        alt="exhibition_id"
                                        height={200}
                                        width={300}
                                    />
                                    {exhibition.title}
                                </div>
                            </CarouselContent>
                        );
                    })}
                </CarouselSlider>
            </SlideWrapper>
        </>
    );
};

const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 1200,
};

export default MainCarousel;
