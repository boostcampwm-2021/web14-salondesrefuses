import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';

import TrendHistory from '@components/Auction/Trend/TrendHistory';
import { GlobalContext } from '@store/GlobalStore';

export type trendHistory = {
    price: string;
    userId: string;
    date: string;
};

const Trend = () => {
    const globalContext = useContext(GlobalContext);
    const { auctionSocket } = globalContext!;

    const [trendHistory, setTrendHistory] = useState<Array<trendHistory>>([]);

    useEffect(() => {
        auctionSocket.on('bid', (data: trendHistory) => {
            setTrendHistory(prev => [ data, ...prev ].slice(0, 6));
        });
    }, [])

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
                    {trendHistory.map((history, idx) =>
                        TrendHistory(history, idx))
                    }
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
