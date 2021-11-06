import React from 'react';
import { randomAuctionType } from 'constants/fakeDatas';

interface Props {
    AuctionsData: randomAuctionType[];
}
const MainAuctionList = ({ AuctionsData }: Props) => {
    return <div>AuctionList</div>;
};

export default MainAuctionList;
