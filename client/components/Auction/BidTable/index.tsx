import styled from '@emotion/styled';
import React from 'react';

const BidTable = () => {
    return (
        <Container>
            <Timer>
                <span>경매 마감 기한</span>
                <b>00:00:00</b>
            </Timer>
            <Bid>
                <div>
                    <span>현재가격</span>
                    <b>4.23 ETH</b>
                </div>
                <Button>입찰 4.24 ETH</Button>
            </Bid>
        </Container>
    );
};

const Container = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
`;

const Timer = styled.div`
    display: flex;
    gap: 40px;
    width: 90%;

    & > b {
        font: ${(props) => props.theme.font.textSm};
        font-size: 1em;
    }
`;

const Bid = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;

    & b,
    span {
        display: block;
        font: ${(props) => props.theme.font.textMd};
        font-size: 15px;
    }
`;

const Button = styled.button`
    border-radius: 11px;
    border: none;
    background-color: rgba(255, 255, 255, 0.5);
    width: 150px;
    height: 45px;
    transition: all 0.3s ease;

    &:hover {
        background-color: rgba(98, 227, 98, 0.6);
        transition: all 0.3s ease;
    }
`;

export default BidTable;
