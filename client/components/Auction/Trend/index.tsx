import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import useAuctionSocketState from '@store/auctionSocketState';
import { trendHistory } from '@components/Auction/ItemDetail';
import TrendHistory from '@components/Auction/TrendHistory';

const Trend = ({ trendHistoryList }: { trendHistoryList: Array<trendHistory> }) => {
    const [socket] = useAuctionSocketState();

    const [trendHistory, setTrendHistory] = useState<Array<trendHistory>>(trendHistoryList);

    useEffect(() => {
        socket.on('@auction/bid', (data: trendHistory) => {
            setTrendHistory((prev) => [data, ...prev].slice(0, 6));
        });
    }, []);

    return (
        <Container>
            <h1>가격 변동 추이</h1>
            <Table>
                <tbody>
                    <tr>
                        <th>event</th>
                        <th>price</th>
                        <th>from</th>
                        <th>to</th>
                        <th>date</th>
                    </tr>
                    {trendHistory.map((history, idx) => TrendHistory(history, idx))}
                </tbody>
            </Table>
        </Container>
    );
};

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    & h1 {
        margin: 0;
        margin-bottom: 20px;
        font: ${(props) => props.theme.font.textMd};
        font-size: 1em;
    }
`;

const Table = styled.table`
    font: ${(props) => props.theme.font.textSm};
    & th {
        border-bottom: 1px solid black;
        font-weight: 500;
        padding: 5px 0;
    }

    & td {
        text-align: center;
        padding: 5px 0;
    }
`;

export default Trend;
