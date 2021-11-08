import React from 'react';
import Link from 'next/link';

import { randomAuctionType } from 'constants/fakeDatas';
import {
    AuctionContainer,
    AuctionCardContainer,
    MoreButtonContainer,
} from './styles';
import Card from '@components/Card';
import { AuctionCardProps } from '@const/card-type';
import { BlackButton } from '@styles/common';

interface Props {
    AuctionsData: randomAuctionType[];
}

const AuctionCardGenerator = ({ auction }: { auction: randomAuctionType }) => {
    let cardAuction: AuctionCardProps = {
        ...auction,
        artist: auction.artist.nickname,
        price: Number(auction.price),
    };
    return <Card width={'md'} content={cardAuction} key={auction.id}></Card>;
};

const MainAuctionList = ({ AuctionsData }: Props) => {
    return (
        <AuctionContainer>
            <p>Auction.</p>
            <AuctionCardContainer>
                {AuctionsData.map((auction) => {
                    <AuctionCardGenerator auction={auction} />;
                })}
            </AuctionCardContainer>
            <Link href="/auction">
                <MoreButtonContainer>
                    <BlackButton>More</BlackButton>
                </MoreButtonContainer>
            </Link>
        </AuctionContainer>
    );
};

export default MainAuctionList;
