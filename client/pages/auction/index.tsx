import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from '@emotion/styled';
import Layout from '@components/common/Layout';

import AuctionCarousel from '@components/Auction/Carousel';

const AuctionPage = ({ data }: any) => {
    return (
        <Container>
            <Head>
                <title>벽전 - Salon des Refusés</title>
                <meta name="description" content="경매중인 작품 리스트" />
            </Head>
            <Layout>
                <AuctionCarousel />
            </Layout>
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {},
    };
};

const Container = styled.div``;

export default AuctionPage;
