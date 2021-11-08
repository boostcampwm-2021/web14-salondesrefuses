import React from 'react';
import styled from '@emotion/styled';

const Trend = () => {
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
                    <tr>
                        <td>Sale</td>
                        <td>4 ETH</td>
                        <td>Moonis</td>
                        <td>Boost</td>
                        <td>a Week ago</td>
                    </tr>
                    <tr>
                        <td>Sale</td>
                        <td>4 ETH</td>
                        <td>Moonis</td>
                        <td>Boost</td>
                        <td>a Week ago</td>
                    </tr>
                    <tr>
                        <td>Sale</td>
                        <td>4 ETH</td>
                        <td>Moonis</td>
                        <td>Boost</td>
                        <td>a Week ago</td>
                    </tr>
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
