import React from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';

import useSessionState from '@store/sessionState';
import Layout from '@components/common/Layout';
import SideBar from '@components/MyPage/Sidebar';
import { useState } from 'react';

export const DETAIL_PAGES = {
    profile: '내 프로필',
    auction: '거래/입찰 내역',
    exhibition: '내 전시',
    artwork: '내 작품',
    favorite: '관심 작품',
};

export type PAGES = typeof DETAIL_PAGES[keyof typeof DETAIL_PAGES];

const MyPage = () => {
    const user = useSessionState().contents;
    const [currentPage, setCurrentPage] = useState<PAGES>('profile');
    console.log(user);
    return (
        <div>
            <Head>
                <title>벽전 - 마이페이지</title>
            </Head>
            <Layout>
                <Container>
                    <SideBar
                        router={(route: PAGES) => {
                            setCurrentPage(route);
                        }}
                        current={currentPage}
                    />
                </Container>
            </Layout>
        </div>
    );
};

const Container = styled.div`
    width: 100%;
`;

export default MyPage;
