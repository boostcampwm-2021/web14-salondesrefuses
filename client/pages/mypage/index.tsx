import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import styled from '@emotion/styled';

import useSessionState from '@store/sessionState';
import Layout from '@components/common/Layout';
import SideBar from '@components/MyPage/Sidebar';
import { Session } from 'interfaces';

const ProfilePage = dynamic(() => import('@components/MyPage/ProfilePage'), {
    ssr: false,
});
const AuctionPage = dynamic(() => import('@components/MyPage/AuctionPage'), {
    ssr: false,
});
const ExhibitionPage = dynamic(() => import('@components/MyPage/Exhibition'), {
    ssr: false,
});
const ArtworkPage = dynamic(() => import('@components/MyPage/ArtworkPage'), {
    ssr: false,
});

export const DETAIL_PAGES = {
    profile: '내 프로필',
    auction: '거래 내역',
    exhibition: '내 전시',
    artwork: '내 작품',
};

export type PAGES = typeof DETAIL_PAGES[keyof typeof DETAIL_PAGES];

const routerPath = (path: PAGES, user: Session) => {
    if (path === 'profile') return <ProfilePage user={user} />;
    else if (path === 'auction') return <AuctionPage />;
    else if (path === 'exhibition') return <ExhibitionPage />;
    else return <ArtworkPage />;
};

const MyPage = () => {
    const user = useSessionState().contents;
    const [currentPage, setCurrentPage] = useState<PAGES>('profile');
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
                    {routerPath(currentPage, user)}
                </Container>
            </Layout>
        </div>
    );
};

const Container = styled.div`
    width: 100%;
    height: calc(100vh);
    postion: relative;

    & > div {
        width: calc(90vw - 350px);
        position: absolute;
        left: 350px;
        top: 120px;
    }
`;

export default MyPage;
