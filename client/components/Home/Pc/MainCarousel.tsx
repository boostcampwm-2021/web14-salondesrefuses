import React, { useEffect, useState, useRef } from 'react';
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
    ExhibitionContainer,
    InfoContainer,
    InfoTitle,
    InfoDescription,
} from './styles';
import { setColorFromImage } from '@utils/setColorFromImage';

interface Props {
    ExhibitionsData: randomExhibitionType[];
}

const MainCarousel = ({ ExhibitionsData }: Props) => {
    let [colorList, setColorList] = useState(new Array(5).fill(false));
    let titleColor = false;
    // let el: Element | null = null;

    useEffect(() => {
        setColorList(
            ExhibitionsData.map((exhibition) =>
                setColorFromImage(exhibition.thumbnail),
            ),
        );
        // el = document.getElementsByClassName('slick-track')[0];
    }, []);
    // useEffect(() => {
    //     console.log(el);
    //     console.log(window.getComputedStyle(el as Element).transition);
    // }, [el && window.getComputedStyle(el!).transition]);
    //https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
    //https://stackoverflow.com/questions/2157963/is-it-possible-to-listen-to-a-style-change-event
    return (
        <>
            <SlideWrapper>
                <CarouselSlider {...settings}>
                    {ExhibitionsData.map((exhibition, i) => {
                        return (
                            <CarouselContent
                                imgSrc={exhibition.thumbnail}
                                key={exhibition.id}
                            >
                                <Title isBlack={colorList[i]}>
                                    Exhibition.
                                </Title>
                                <div>
                                    <ExhibitionContainer>
                                        <StyledImage>
                                            <img
                                                src={exhibition.thumbnail}
                                                alt="exhibition_id"
                                            />
                                        </StyledImage>
                                        <InfoContainer>
                                            <InfoTitle>
                                                {exhibition.title}
                                            </InfoTitle>
                                            <InfoDescription>
                                                {exhibition.artist.nickname}
                                            </InfoDescription>
                                            <InfoDescription>
                                                {exhibition.description}
                                            </InfoDescription>
                                        </InfoContainer>
                                    </ExhibitionContainer>
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
