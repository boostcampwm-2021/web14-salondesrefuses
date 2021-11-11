import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Artwork } from 'interfaces';
import Layout from '@components/common/Layout';

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

    useEffect(() => {
        // TODO: id값으로 완성된 Artwork 하나의 정보 가져오기
    });

    return (
        <Container>
            <Head>
                <title>벽전 - 작품 등록 결과</title>
            </Head>
            <Layout>
                <div></div>
            </Layout>
        </Container>
    );
};

const Container = styled.div``;

export default ResultPage;
