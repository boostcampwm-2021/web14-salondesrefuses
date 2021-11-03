import React from 'react';
import Head from 'next/head';
import Layout from '@components/common/Layout';

const Pc = () => {
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
