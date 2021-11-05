import React from 'react';
import Head from 'next/head';
import Layout from '@components/common/Layout';
import MainCarousel from './MainCarousel';
import MainAuctionList from './MainAuctionList';
import {
    randomAuctionType,
    randomExhibitionType,
    fakeRandomExhibitions,
} from 'constants/fakeDatas';
import NftInfo from './NftInfo';

interface Props {
    ExhibitionsData: string[];
    AuctionsData: string[];
}
const Pc = (props: Props) => {
    let ExhibitionsData = props.ExhibitionsData.map((exhibition: string) =>
        JSON.parse(exhibition),
    ) as randomExhibitionType[];
    const AuctionsData = props.AuctionsData.map((auction: string) =>
        JSON.parse(auction),
    ) as randomAuctionType[];
    //테스트용! 데이터셋이 준비될때까지 이거로
    if (!ExhibitionsData.length) ExhibitionsData = fakeRandomExhibitions;

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
