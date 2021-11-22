import React, { useState } from 'react';
import Link from 'next/link';

import { ExhibitionCardProps, AuctionCardProps, CardSize } from '@const/card-type';
import { BlurBottom, CardContainer, Price, Title, P, BlurFull, PriceContainer } from './style';
import LazyImage from './LazyImage';
import ethLogo from '@assets/images/ETH.png';

interface Props {
    width: 'md' | 'lg';
    content: ExhibitionCardProps | AuctionCardProps;
}
interface ExhibitionFormProps {
    content: ExhibitionCardProps;
    isHovered: boolean;
}
interface AuctionFormProps {
    content: AuctionCardProps;
    isHovered: boolean;
}

const ExhibitionForm = ({ content, isHovered }: ExhibitionFormProps) => {
    return isHovered ? (
        <BlurFull>
            <Title>{content.title}</Title>
            <P>Artist: {content.artist}</P>
            <P>Category: {content.category}</P>
            <P>Theme: {content.theme}</P>
            <P>Number of works: {content.artist}</P>
            {content.description && <P>Description: {content.description}</P>}
        </BlurFull>
    ) : (
        <BlurBottom>
            <div>
                <Title align={'center'}>{content.title}</Title>
                <P align={'center'}>{content.artist}</P>
                {content.isSale && (
                    <PriceContainer>
                        <img src={ethLogo.src} alt="auction exsist, eth" />
                    </PriceContainer>
                )}
            </div>
        </BlurBottom>
    );
};
const AuctionForm = ({ content, isHovered }: AuctionFormProps) => {
    return isHovered ? (
        <BlurFull>
            <Title>{content.title}</Title>
            <P>Artist: {content.artist}</P>
            {content.description && <P>Description: {content.description}</P>}
        </BlurFull>
    ) : (
        <BlurBottom>
            <div>
                <Title>{content.title}</Title>
                <P>{content.artist}</P>
                {content.price && (
                    <PriceContainer>
                        <Price>{content.price}</Price>
                        <img src={ethLogo.src} alt="auction exsist, eth" />
                    </PriceContainer>
                )}
            </div>
        </BlurBottom>
    );
};

const Card = ({ width, content }: Props) => {
    const isExhibition = content.hasOwnProperty('isSale') || content.hasOwnProperty('collaborator');
    console.log(isExhibition);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={isExhibition ? `/exhibition/${content.id}` : `/auction/${content.id}`}>
            <CardContainer
                width={CardSize[width]}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <LazyImage src={content.thumbnailImage} alt={content.title} />
                {isExhibition ? (
                    <ExhibitionForm content={content as ExhibitionCardProps} isHovered={isHovered} />
                ) : (
                    <AuctionForm content={content as AuctionCardProps} isHovered={isHovered} />
                )}
            </CardContainer>
        </Link>
    );
};

export default Card;
