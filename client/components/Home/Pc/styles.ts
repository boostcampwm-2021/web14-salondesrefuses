import styled from '@emotion/styled';
import Slider from 'react-slick';
import Image from 'next/image';
import { BlackButton, Center, SpaceBetween } from '@styles/common';
////////////////
// Exhibition //
////////////////

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
        height: 100%;
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
        padding: 80px 130px;
    }
`;

export const ExhibitionContainer = styled.div`
    ${Center}
    margin: 50px;
`;

export const StyledImage = styled.div`
    flex-grow: 1;
    width: 50%;
    ${Center}
    & img {
        max-width: 400px;
        max-height: 300px;
        width: auto;
        height: auto;
    }
`;

interface TitleProps {
    isBlack: boolean;
}

export const Title = styled.p<TitleProps>`
    position: absolute;

    font: ${(props) => props.theme.font.textEnTitle};
    z-index: 30;
    text-align: left;
    margin: 30px 0 0 140px;
    color: ${(props) =>
        props.isBlack ? props.theme.color.black : props.theme.color.white};
    &:after {
        content: '';
        display: block;
        width: 40%;
        border-bottom: 4px solid ${(props) => props.theme.color.primary};
    }
`;

export const InfoContainer = styled.div`
    width: 50%;
    flex-grow: 1;
    margin-left: 30px;

    & > button {
        margin-top: 30px;
    }
`;

export const InfoTitle = styled.p`
    font: ${(props) => props.theme.font.textEnLg};
`;
export const InfoDescription = styled.p`
    font: ${(props) => props.theme.font.textEnBase};
    margin-top: 10px;
`;
/////////////
// Auction //
/////////////

export const AuctionContainer = styled.div`
    width: 100%;
    margin-top: 100px;
    padding: 30px 150px;
    & > p {
        margin: 0 auto;
        font: ${(props) => props.theme.font.textEnTitle};
        z-index: 30;
        text-align: center;
        color: ${(props) => props.theme.color.black};
        &:after {
            content: '';
            margin: 0 auto;
            display: block;
            width: 5%;
            border-bottom: 3px solid ${(props) => props.theme.color.primary};
        }
    }
`;
export const AuctionCardContainer = styled.div`
    width: 100%;
    margin-top: 50px;
    ${SpaceBetween};
`;

export const MoreButtonContainer = styled.div`
    ${Center};
    margin: 50px auto;
`;
