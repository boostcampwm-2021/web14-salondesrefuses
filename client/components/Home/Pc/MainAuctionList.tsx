import React from 'react';
import Link from 'next/link';

import {
    AuctionContainer,
    AuctionCardContainer,
    MoreButtonContainer,
} from './styles';
import Card from '@components/Card';
import { AuctionCardProps } from '@const/card-type';
import { BlackButton } from '@styles/common';

interface Props {
    AuctionsData: AuctionCardProps[];
}

const MainAuctionList = ({ AuctionsData }: Props) => {
    return (
        <AuctionContainer>
            <p>Auction.</p>
            <AuctionCardContainer>
                {AuctionsData.map((auction) =>
                    <Card width={'md'} content={auction} key={auction.id}/>
                )}
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
