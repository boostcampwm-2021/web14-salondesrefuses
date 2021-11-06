import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { randomExhibitionType } from 'constants/fakeDatas';
import {
    CarouselSlider,
    SlideWrapper,
    CarouselContent,
    StyledImage,
    Title,
} from './styles';
import { setColorFromImage } from '@utils/setColorFromImage';

interface Props {
    ExhibitionsData: randomExhibitionType[];
}

const MainCarousel = ({ ExhibitionsData }: Props) => {
    let [colorList, setColorList] = useState(new Array(5).fill(false));
    const [titleColor, setTitleColor] = useState('#fff');
    useEffect(() => {
        setColorList(
            ExhibitionsData.map((exhibition) =>
                setColorFromImage(exhibition.thumbnail),
            ),
        );
    }, []);
    return (
        <>
            <Title>Exhibition.</Title>
            <SlideWrapper>
                <CarouselSlider {...settings}>
                    {ExhibitionsData.map((exhibition) => {
                        return (
                            <CarouselContent
                                imgSrc={exhibition.thumbnail}
                                key={exhibition.id}
                            >
                                <div>
                                    <StyledImage
                                        src={exhibition.thumbnail}
                                        alt="exhibition_id"
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
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
};

export default MainCarousel;
