import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { Auction } from 'interfaces';
import useAuctionSocketState from '@store/auctionSocketState';
import { trendHistory } from '@components/Auction/ItemDetail';
import { getRemainingTime } from '@utils/time';
import Web3 from 'web3';
import { WEI } from '@constants/eth';
import useToastState from '@store/toastState';

let eventSource: EventSource | null;
let account: string | null;

const BidTable = ({
    auction,
    currentPrice,
}: {
    auction: Auction;
    currentPrice: number;
}) => {
    const { id, artwork } = auction;
    let { endAt } = auction;
    const [socket] = useAuctionSocketState();
    const [toast, setToast] = useToastState();
    const [price, setPrice] = useState<number>(
        currentPrice ? Number((currentPrice + 0.01).toFixed(2)) : artwork.price,
    );
    const [auctionDeadline, setAuctionDeadline] = useState<string | null>(null);

    const web3 = new Web3(
        new Web3.providers.HttpProvider(process.env.ETHEREUM_HOST!),
    );

    const checkBiddable = async (price: number) => {
        if (!window.ethereum) return false;
        [account] = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });
        if (!account) return false;
        const balance = await web3.eth.getBalance(account);
        if (price > +balance / WEI) return false;
        return true;
    };

    const bidArtwork = async () => {
        const biddable = await checkBiddable(price);
        if (!biddable) {
            showToast();
            return;
        }
        socket.emit('@auction/bid', {
            id,
            bidderName: 'userId',
            price,
            biddedAt: Date.now(),
        });
    };

    useEffect(() => {
        socket.on('@auction/bid', (data: trendHistory) => {
            const currentBidPrice = Number(data.price);
            console.log(Number((currentBidPrice + 0.01).toFixed(2)));
            setPrice(Number((currentBidPrice + 0.01).toFixed(2)));
        });

        socket.on(
            '@auction/time_update',
            (data: { id: number; endAt: Date }) => {
                endAt = new Date(data.endAt);
            },
        );

        eventSource = new EventSource(`${process.env.API_SERVER_URL}/sse`);

        eventSource.onmessage = ({ data }) => {
            setAuctionDeadline(
                getRemainingTime(Number(data), new Date(endAt).getTime()),
            );
        };
    }, []);

    const showToast = () => {
        setToast({
            ...toast,
            show: true,
            content: '지갑에 ETH가 부족합니다.',
            success: false,
        });
        setTimeout(() => {
            setToast({
                show: false,
                content: '지갑에 ETH가 부족합니다.',
                success: false,
            });
        }, 5000);
    };

    return (
        <Container>
            <Timer>
                <span>경매 마감 기한</span>
                <b>{auctionDeadline}</b>
            </Timer>
            <Bid>
                <div>
                    <span>현재가격</span>
                    <b>{price} ETH</b>
                </div>
                <Button onClick={bidArtwork}>입찰 {price} ETH</Button>
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
    padding: 20px 0;
`;

const Timer = styled.div`
    display: flex;
    gap: 10px;
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
        min-width: 65px;
        font: ${(props) => props.theme.font.textMd};
        font-size: 15px;
        margin-top: 5px;
    }
`;

const Button = styled.button`
    border-radius: 11px;
    border: none;
    background-color: rgba(255, 255, 255, 0.5);
    width: 150px;
    height: 45px;
    margin-top: 5px;
    transition: all 0.3s ease;

    &:hover {
        background-color: rgba(98, 227, 98, 0.6);
        transition: all 0.3s ease;
    }
`;

export default BidTable;
