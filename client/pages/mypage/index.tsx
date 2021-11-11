import React from 'react';
import Head from 'next/head';
import Layout from '@components/common/Layout';

const MyPage = () => {
    return (
        <div>
            <Head>
                <title>벽전 - 마이페이지</title>
            </Head>
            <Layout>You're in 'MyPage'</Layout>
        </div>
    );
};

export default MyPage;
