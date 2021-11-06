import React from 'react';
import { randomAuctionType } from 'constants/fakeDatas';
import { AuctionContainer, AuctionCardContainer } from './styles';
import Card from '@components/Card';
import { AuctionCardProps } from '@const/card-type';

interface Props {
    AuctionsData: randomAuctionType[];
}
const MainAuctionList = ({ AuctionsData }: Props) => {
    return (
        <AuctionContainer>
            <p>Auction.</p>
            <AuctionCardContainer>
                {AuctionsData.map((auction) => {
                    let cardAuction: AuctionCardProps = {
                        ...auction,
                        artist: auction.artist.nickname,
                        price: Number(auction.price),
                    };
                    return <Card width={'md'} content={cardAuction}></Card>;
                })}
            </AuctionCardContainer>
        </AuctionContainer>
    );
};

export default MainAuctionList;
