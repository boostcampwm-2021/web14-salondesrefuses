import React from 'react';
import Head from 'next/head';
import Layout from '@components/common/Layout';
import MainCarousel from './MainCarousel';
import MainAuctionList from './MainAuctionList';
import NftInfo from './NftInfo';
import { AuctionCardProps, ExhibitionCardProps } from '@const/card-type';

interface Props {
    ExhibitionsData: ExhibitionCardProps[];
    AuctionsData: AuctionCardProps[];
}
const Pc = (props: Props) => {
    const { ExhibitionsData, AuctionsData } = props;

    return (
        <>
            <Head>
                <title>벽전 - Salon des Refusés</title>
                <meta name="description" content="벽전 메인 페이지입니다." />
            </Head>
            <Layout>
                <MainCarousel ExhibitionsData={ExhibitionsData} />
                <MainAuctionList AuctionsData={AuctionsData} />
                <NftInfo />
            </Layout>
        </>
    );
};

export default Pc;
