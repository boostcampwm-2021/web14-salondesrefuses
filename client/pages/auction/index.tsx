import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from '@emotion/styled';
import Layout from '@components/common/Layout';

import AuctionCarousel from '@components/Auction/Carousel';
import AuctionList from '@components/Auction/AuctionList';

const AuctionPage = () => {
    return (
        <Container>
            <Head>
                <title>벽전 - Salon des Refusés</title>
                <meta name="description" content="경매중인 작품 리스트" />
            </Head>
            <Layout horizontal={false}>
                <AuctionCarousel />
                <AuctionList />
            </Layout>
        </Container>
    );
};

const Container = styled.div``;

export default AuctionPage;
