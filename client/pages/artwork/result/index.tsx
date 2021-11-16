import React, { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import { Artwork } from 'interfaces';
import Layout from '@components/common/Layout';
import { getSingleArtwork } from '@utils/networking';
import { Center } from '@styles/common';
import ResultDetail from '@components/Artwork/ResultDetail';
import ABI from '@public/ethereum/abi.json';
import contractAddress from '@public/ethereum/address.json';

const DUMMY_DATA: Artwork = {
    id: 1,
    title: 'placeat',
    type: '사진',
    price: 0.91,
    description: 'Id temporibus reiciendis molestias.',
    status: 'InBid',
    nftToken: 'Qui nisi aut.',
    originalImage:
        'https://storage.opensea.io/static/promocards/1989sisters_promo_card.jpeg',
    croppedImage:
        'https://storage.opensea.io/static/promocards/1989sisters_promo_card.jpeg',
    exhibitionId: 1,
    artistId: 2,
    ownerId: 2,
};

let account: string | null;

const ResultPage = () => {
    const { id } = useRouter().query;
    const [artwork, setArtwork] = useState<Artwork>(DUMMY_DATA);
    const web3 = new Web3(
        new Web3.providers.HttpProvider('http://118.67.132.119:8545'),
    );

    const onClickConfirm = async () => {
        if (!window.ethereum) return;
        await window.ethereum.enable();
        [account] = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });
        console.log(account);

        const contract = new web3.eth.Contract(
            ABI.abi as AbiItem[],
            contractAddress.address,
        );
        const result = await contract.methods
            .createNFT(account, artwork.nftToken)
            .send({ from: account, gas: 3000000 })
            .once('receipt', console.log)
            .on('error', console.log);
        console.log(result);
    };

    useEffect(() => {
        if (!id) return;
        getSingleArtwork(+id).then((res) => setArtwork(res.data));
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
            account = accounts[0];
        });
        document.documentElement.style.overflow = 'hidden';

        return () => {
            document.documentElement.style.overflow = 'visible';
        };
    }, []);

    return (
        <>
            <Head>
                <title>벽전 - 작품 등록 결과</title>
            </Head>
            <Layout>
                <Container>
                    <Background
                        src={artwork.originalImage}
                        alt={artwork.title}
                    />
                    <Body>
                        <img src={artwork.originalImage} alt="" />
                        <ResultDetail artwork={artwork} />
                    </Body>
                    <Buttons>
                        <button onClick={onClickConfirm}>Confirm</button>
                        <button>Reject</button>
                    </Buttons>
                </Container>
            </Layout>
        </>
    );
};

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

    & > button {
        height: 50px;
        width: 40%;
        border: none;
        background: rgba(0, 0, 0, 0.4);
        color: white;
        box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        transition: all 0.3s ease;
        font: ${(props) => props.theme.font.textEnMd};

        &:hover {
            background: white;
            color: black;
            transition: all 0.3s ease;
        }
    }
`;

export default ResultPage;
