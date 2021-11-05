import React from 'react';
import Head from 'next/head';
import Layout from '@components/common/Layout';
import {
    randomExhibitionType,
    fakeRandomExhibitions,
} from 'constants/fakeDatas';

interface Props {
    ExhibitionData: randomExhibitionType[];
}
const Pc = ({ props }: any) => {
    let ExhibitionsData = props.ExhibitionsData.map((exhibition: string) =>
        JSON.parse(exhibition),
    );
    const AuctionsData = props.AuctionsData.map((auction: string) =>
        JSON.parse(auction),
    );
    //테스트용! 데이터셋이 준비될때까지 이거로
    if (!ExhibitionsData.length) ExhibitionsData = fakeRandomExhibitions;

    return (
        <>
            <Head>
                <title>벽전 - Salon des Refusés</title>
                <meta name="description" content="벽전 메인 페이지입니다." />
            </Head>
            <Layout>메인 페이지 PC 버전 입니다.</Layout>
        </>
    );
};

export default Pc;
