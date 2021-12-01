import React, { useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';

import Layout from '@components/common/Layout';
import { TopContainer, Buttons, BlackButton } from '../../components/Exhibition/style';
import ListFilter from '@components/Exhibition/ListFilter';
import ExhibitionList from '@components/Exhibition/ExhibitionList';
import useSessionState from '@store/sessionState';
import useModalState from '@store/modalState';

const ExhibitionPage: NextPage = () => {
    const [onSelect, setOnSelect] = useState<string>('Newest');
    const [_, setModalState] = useModalState();
    const session = useSessionState().contents;

    const handleFilter = ({ currentTarget }: React.MouseEvent) => {
        setOnSelect(currentTarget.textContent || 'Newest');
    };

    const onClickButtonWithoutSession = () => {
        setModalState({
            show: true,
            onConfirm: () => {},
            content: '먼저 로그인을 해주세요.',
        });
    };

    const buildButtons = () => {
        return session ? (
            <>
                <Link href="/exhibition/post">
                    <BlackButton>Hold Exhibition</BlackButton>
                </Link>
                <Link href="/artwork/post">
                    <BlackButton>Post Artwork</BlackButton>
                </Link>
            </>
        ) : (
            <>
                <BlackButton onClick={onClickButtonWithoutSession}>Hold Exhibition</BlackButton>
                <BlackButton onClick={onClickButtonWithoutSession}>Post Artwork</BlackButton>
            </>
        );
    };

    return (
        <>
            <Head>
                <title>벽전 - 전시회 목록</title>
                <meta content="벽전 - 전시회 목록" />
            </Head>
            <Layout>
                <TopContainer>
                    <ListFilter handleFilter={handleFilter} select={onSelect} />
                    <Buttons>{buildButtons()}</Buttons>
                </TopContainer>
                <ExhibitionList onSelect={onSelect} />
            </Layout>
        </>
    );
};

export interface FilterProps {
    select: boolean;
}

export default ExhibitionPage;
