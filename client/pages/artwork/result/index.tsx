import React, { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Web3 from 'web3';

import { Artwork } from 'interfaces';
import Layout from '@components/common/Layout';
import { getSingleArtwork } from '@utils/networking';
import { Center } from '@styles/common';

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

// TODO: web3.js 연동, NFT 토큰 Metamask 지갑에 집어넣기.
const ResultPage = () => {
    const { id } = useRouter().query;
    const [artwork, setArtwork] = useState<Artwork>(DUMMY_DATA);
    const [hover, setHover] = useState(false);
    const web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:7545'),
    );
    console.log(id);

    const getAccounts = async () => {
        const address = await web3.eth.personal.getAccounts();
        console.log(address[0]);
        const balance = await web3.eth
            .getBalance(address[0])
            .then((res) => +res / 1000000000000000000);
        console.log(balance);
    };

    useEffect(() => {
        // TODO: id값으로 완성된 Artwork 하나의 정보 가져오기
        if (!id) return;
        getSingleArtwork(+id).then((res) => setArtwork(res.data));

        getAccounts();
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
                    <div>
                        <Inner>
                            <FrontFace>
                                <img src={artwork.originalImage} alt="" />
                            </FrontFace>
                            <BackFace>
                                <div>
                                    <span>title : {artwork.title}</span>
                                    <span>
                                        description : {artwork.description}
                                    </span>
                                    <span>type: {artwork.type}</span>
                                    <span>NFT Token : ${artwork.nftToken}</span>
                                </div>
                                <img src={artwork.originalImage} alt="" />
                            </BackFace>
                        </Inner>
                    </div>
                    <Buttons>
                        <button>Confirm</button>
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

    & > div {
        perspective: 1000px;
    }
`;

const Background = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    transform: scale(1.3);
    filter: blur(50px);
`;

const Inner = styled.div`
    position: relative;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    ${Center};
    top: 30px;

    &:hover {
        transform: rotateY(180deg);
    }
`;

const FrontFace = styled.div`
    position: absolute;
    backface-visibility: hidden;
    z-index: 300;
    box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.2);
    border: 5px solid white;

    & > img {
        max-height: 500px;
        max-width: 500px;
    }
`;

const BackFace = styled.div`
    box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.2);

    & > div {
        position: absolute;
        backface-visibility: visible;
        background-color: rgba(0, 0, 0, 0.4);
        width: 100%;
        height: 100%;
        z-index: 200;
        overflow-y: scroll;
        color: white;
        transform: scaleX(-1);
        padding: 5% 5%;

        & > span {
            display: block;
            font: ${(props) => props.theme.font.textMd};
            margin-bottom: 5px;
        }
    }

    & > img {
        transform: scaleX(-1);
        max-height: 500px;
        filter: blur(100px);
    }
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
