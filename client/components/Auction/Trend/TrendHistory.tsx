import React  from 'react';

import { calcBidDate } from '@utils/time';

const TrendHistory = ({ price, userId, date }: {[key: string]: string}, idx: number) => {

    return (
        <tr key={idx}>
            <td>Bid</td>
            <td>{price} ETH</td>
            <td>{userId}</td>
            <td>Boost</td>
            <td>{calcBidDate(Number(date))}</td>
        </tr>
    )
};

export default TrendHistory;
