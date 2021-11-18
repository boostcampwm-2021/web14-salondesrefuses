import React from 'react';
import Head from 'next/head';

import useSessionState from '@store/sessionState';
import Layout from '@components/common/Layout';

const MyPage = () => {
    const user = useSessionState().contents;
    console.log(user);
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
