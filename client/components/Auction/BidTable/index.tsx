import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';

import { Auction } from 'interfaces';
import useAuctionSocketState from '@store/auctionSocketState';
import { trendHistory } from '@components/Auction/ItemDetail';
import { getRemainingTime } from '@utils/time';
import useToast from '@hooks/useToast';
import ABI from '@public/ethereum/abi.json';
import contractAddress from '@public/ethereum/address.json';
import useSessionState from '@store/sessionState';
import useModalState from '@store/modalState';
import { useRouter } from 'next/router';
import { ToastMsg } from '@const/toast-message';

let eventSource: EventSource | null;
let account: string | null;

const WEI = 1000000000000000000;

const BidTable = ({ auction, currentPrice }: { auction: Auction; currentPrice: number }) => {
    const { id, artwork } = auction;
    let { endAt } = auction;
    const [socket] = useAuctionSocketState();
    const [price, setPrice] = useState<number>(currentPrice ? nextPrice(currentPrice) : artwork.price);
    const [auctionDeadline, setAuctionDeadline] = useState<string | null>(null);
    const [contract, setContract] = useState<Contract>();
    const [_, setModalState] = useModalState();
    const router = useRouter();
    const user = useSessionState().getValue();
    const showNotEnoughEthToast = useToast({
        onSuccess: '',
        onFailed: ToastMsg.NOT_ENOUGH_ETH,
    });
    const showNeedMetamaskToast = useToast({
        onSuccess: '',
        onFailed: ToastMsg.NEED_METAMASK_ACCOUNT,
    });
    const showNotBidOwner = useToast({
        onSuccess: '',
        onFailed: ToastMsg.NOT_BID_OWNER,
    });
    const showNotBidLowerPrice = useToast({
        onSuccess: '',
        onFailed: ToastMsg.NOT_BID_LOWER_PRICE,
    });

    const web3 = new Web3(new Web3.providers.HttpProvider(ETHEREUM_HOST!));

    const checkBiddable = async (price: number) => {
        if (!window.ethereum) {
            showNeedMetamaskToast('failed');
            return false;
        }
        [account] = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });
        if (!account) {
            showNeedMetamaskToast('failed');
            return false;
        }
        const balance = await web3.eth.getBalance(account);
        if (price > +balance / WEI) return false;
        return true;
    };

    const bidNFT = async (price: number) => {
        if (!window.ethereum || !contract) {
            showNeedMetamaskToast('failed');
            return false;
        }

        [account] = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });

        if (!account) {
            showNeedMetamaskToast('failed');
            return false;
        }

        try {
            await contract.methods.bid(artwork.nftToken).send({
                from: account,
                value: Web3.utils.toWei(price.toString(), 'ether'),
                gas: GAS_LIMIT,
            });
            return true;
        } catch (error: any) {
            const parseStr = error.message.match(/{.*}/);
            if (!parseStr) return false;
            const message = JSON.parse(parseStr[0].replaceAll("'", '"'));
            if (message.code === MESSAGE_FAILED) {
                showNotBidOwner('failed');
            } else if (message.code === MESSAGE_SUCCEED) {
                setPrice((price) => nextPrice(price));
                showNotBidLowerPrice('failed');
            }
        }
    };

    const bidArtwork = async () => {
        const biddable = await checkBiddable(price);
        if (!biddable) {
            showNotEnoughEthToast('failed');
            return;
        }

        const isBidSuccess = await bidNFT(price);
        if (!isBidSuccess) {
            return;
        }

        socket.emit('@auction/bid', {
            auctionId: id,
            bidderId: user!.id,
            bidderName: user!.name,
            price,
            biddedAt: Date.now(),
        });
    };

    useEffect(() => {
        socket.on('@auction/bid', (data: trendHistory) => {
            const currentBidPrice = Number(data.price);
            setPrice(Number((currentBidPrice * 1.05).toFixed(2)));
        });

        socket.on('@auction/time_update', (data: { id: number; endAt: Date }) => {
            endAt = new Date(data.endAt);
        });

        eventSource = new EventSource(`${process.env.API_SERVER_URL}/sse`);

        eventSource.onmessage = ({ data }) => {
            setAuctionDeadline(getRemainingTime(Number(data), new Date(endAt).getTime()));
        };

        setContract(new web3.eth.Contract(ABI.abi as AbiItem[], contractAddress.address));

        return () => {
            socket?.offAny();
            eventSource?.close();
        };
    }, []);

    useEffect(() => {
        if (auctionDeadline === '00:00:00') {
            setModalState({
                show: true,
                onConfirm: () => {
                    router.push('/auction');
                },
                content: '이미 종료된 경매입니다.',
            });
        }
    }, [auctionDeadline]);

    return (
        <>
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
        </>
    );
};

const nextPrice = (currentPrice: number) => {
    return Math.max(currentPrice + 0.01, Number((currentPrice * 1.05).toFixed(2)));
};

const MESSAGE_FAILED = '100';
const MESSAGE_SUCCEED = '200';

const ETHEREUM_HOST = process.env.ETHEREUM_HOST;
const GAS_LIMIT = 3000000;

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
