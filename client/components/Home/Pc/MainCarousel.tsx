import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
import { BlackButton } from '@styles/common';
import { ExhibitionCardProps } from '@const/card-type';

interface Props {
    ExhibitionsData: ExhibitionCardProps[];
}

const MainCarousel = ({ ExhibitionsData }: Props) => {
    let [colorList, setColorList] = useState<boolean[]>(
        new Array(5).fill(false),
    );

    const getColorLost = () => {
        ExhibitionsData.map(async (exhibition, i) => {
            let colorData = await setColorFromImage(exhibition.thumbnailImage);
            setColorList((colorList) => {
                let tmp = [...colorList];
                tmp[i] = colorData;
                return tmp;
            });
        });
    };
    useEffect(() => {
        getColorLost();
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
                                thumbnailImage={exhibition.thumbnailImage}
                                key={exhibition.id}
                            >
                                <Title isBlack={colorList[i]}>
                                    Exhibition.
                                </Title>
                                <div>
                                    <ExhibitionContainer>
                                        <StyledImage>
                                            <img
                                                src={exhibition.thumbnailImage}
                                                alt="exhibition_id"
                                            />
                                        </StyledImage>
                                        <InfoContainer>
                                            <InfoTitle>
                                                {exhibition.title}
                                            </InfoTitle>
                                            <InfoDescription>
                                                {exhibition.artist}
                                            </InfoDescription>
                                            <InfoDescription>
                                                {exhibition.description}
                                            </InfoDescription>
                                            <Link
                                                href={`/exhibition/${exhibition.id}`}
                                            >
                                                <BlackButton>
                                                    전시 보러 가기
                                                </BlackButton>
                                            </Link>
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
