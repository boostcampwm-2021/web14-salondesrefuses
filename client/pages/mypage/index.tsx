import React, { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import styled from '@emotion/styled';

import useSessionState from '@store/sessionState';
import Layout from '@components/common/Layout';
import SideBar from '@components/MyPage/Sidebar';

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
const FavoritePage = dynamic(() => import('@components/MyPage/FavoritePage'), {
    ssr: false,
});

export const DETAIL_PAGES = {
    profile: '내 프로필',
    auction: '거래/입찰 내역',
    exhibition: '내 전시',
    artwork: '내 작품',
    favorite: '관심 작품',
};

export type PAGES = typeof DETAIL_PAGES[keyof typeof DETAIL_PAGES];

const routerPath = (path: PAGES) => {
    if (path === 'profile') return <ProfilePage />;
    else if (path === 'auction') return <AuctionPage />;
    else if (path === 'exhibition') return <ExhibitionPage />;
    else if (path === 'artwork') return <ArtworkPage />;
    else return <FavoritePage />;
};

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
                {routerPath(currentPage)}
            </Layout>
        </div>
    );
};

const Container = styled.div`
    width: 100%;
`;

export default MyPage;
