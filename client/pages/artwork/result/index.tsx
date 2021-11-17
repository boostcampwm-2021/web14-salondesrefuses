import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';

import { Artwork } from 'interfaces';
import Layout from '@components/common/Layout';
import { getSingleArtwork } from '@utils/networking';
import { Center } from '@styles/common';
import ResultDetail from '@components/Artwork/ResultDetail';

import ABI from '@public/ethereum/abi.json';
import contractAddress from '@public/ethereum/address.json';

const ResultPage = () => {
    const {
        push,
        query: { id },
    } = useRouter();
    const [artwork, setArtwork] = useState<Artwork>();
    const [token, setToken] = useState<string>();
    const web3 = new Web3(new Web3.providers.HttpProvider(ETHEREUM_HOST!));
    const [contract, setContract] = useState<Contract>();

    const mint = async () => {
        if (!window.ethereum || !contract) return;
        await window.ethereum.enable();
        [account] = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });

        const result = await contract.methods
            .createNFT(account, artwork!.nftToken)
            .send({ from: account, gas: GAS_LIMIT });
        const tokenId = result.events.Transfer.returnValues.tokenId;

        // const balanceOf = await contract.methods.balanceOf(account!).call();
        // console.log('balance : ', balanceOf);
        return tokenId;
    };

    const onClickConfirm = async () => {
        const tokenId = await mint();
        if (tokenId) setToken(tokenId);
    };

    const onClickDone = () => {
        if (!contract) return;
        push('/');
    };

    useEffect(() => {
        document.documentElement.style.overflow = 'hidden';

        return () => {
            document.documentElement.style.overflow = 'visible';
        };
    }, []);

    useEffect(() => {
        if (!id) return;
        getSingleArtwork(+id).then((res) => setArtwork(res.data));
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
            account = accounts[0];
        });
        setContract(
            new web3.eth.Contract(
                ABI.abi as AbiItem[],
                contractAddress.address,
            ),
        );
    }, [id]);

    useEffect(() => {
        //TODO : api 만들어주면 토큰 쏘기
    }, [token]);

    return (
        <>
            <Head>
                <title>벽전 - 작품 등록 결과</title>
            </Head>
            <Layout>
                <Container>
                    <Background
                        src={artwork?.originalImage}
                        alt={artwork?.title}
                    />
                    <Body>
                        <img src={artwork?.originalImage} alt="" />
                        {artwork && (
                            <ResultDetail artwork={artwork} token={token} />
                        )}
                    </Body>
                    <Buttons>
                        <Button
                            onClick={onClickConfirm}
                            active={token ? false : true}
                        >
                            Mint
                        </Button>
                        <Button
                            active={token ? true : false}
                            onClick={onClickDone}
                        >
                            Done
                        </Button>
                    </Buttons>
                </Container>
            </Layout>
        </>
    );
};

let account: string | null;
const ETHEREUM_HOST = process.env.ETHEREUM_HOST;
const GAS_LIMIT = 3000000;

const Container = styled.div`
    width: 100vw;
    height: calc(100vh + 70px);
    position: absolute;
    top: -70px;
    z-index: 200;
    ${Center};
`;

const Body = styled.div`
    width: 80%;
    height: 40%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: center;
    justify-items: center;

    & > img {
        z-index: 200;
        max-height: 50vh;
        max-width: 35vw;
        border: 5px solid white;
        box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
    }
`;

const Background = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    transform: scale(1.3);
    filter: blur(50px);
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
    width: 30vw;
    position: absolute;
    bottom: 8%;
`;

const Button = styled.button<{ active: boolean }>`
    height: 50px;
    width: 40%;
    border: none;
    background: ${(props) =>
        props.active ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.1)'};
    color: white;
    box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    transition: all 0.3s ease;
    font: ${(props) => props.theme.font.textEnMd};

    ${(props) =>
        props.active
            ? `&:hover {
        background: white;
        color: black;
        transition: all 0.3s ease;
    }`
            : ''}
`;

export default ResultPage;
