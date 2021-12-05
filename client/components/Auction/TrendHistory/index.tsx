import React  from 'react';

import { calcBidDate } from '@utils/time';

type Props = {
    bidder: {
        name: string;
    };
    price: string;
    biddedAt: string;
}

const TrendHistory = ({ bidder, price, biddedAt }: Props, idx: number) => {
    const date = new Date(biddedAt).getTime();

    return (
        <tr key={idx}>
            <td>Bid</td>
            <td>{price} ETH</td>
            <td>{bidder.name}</td>
            <td>Boost</td>
            <td>{calcBidDate(date)}</td>
        </tr>
    )
};

export default TrendHistory;
