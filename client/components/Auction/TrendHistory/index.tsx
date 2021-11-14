import React  from 'react';

import { calcBidDate } from '@utils/time';

const TrendHistory = ({ bidderName, price, biddedAt }: {[key: string]: string}, idx: number) => {
    const date = new Date(biddedAt).getTime();

    return (
        <tr key={idx}>
            <td>Bid</td>
            <td>{price} ETH</td>
            <td>{bidderName}</td>
            <td>Boost</td>
            <td>{calcBidDate(date)}</td>
        </tr>
    )
};

export default TrendHistory;
