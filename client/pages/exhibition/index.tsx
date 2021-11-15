import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';

import Layout from '@components/common/Layout';
import {
    TopContainer,
    Buttons,
    BlackButton,
} from '../../components/Exhibition/style';
import useHandleRequireLoginModal from '@hooks/useHandleRequireLoginModal';
import RequireLoginModal from '@components/common/RequireLoginModal';
import parseCookie from '@utils/parseCookie';
import ListFilter from '@components/Exhibition/ListFilter';
import ExhibitionList from '@components/Exhibition/ExhibitionList';

let accessToken: string | undefined;

const ExhibitionPage: NextPage = () => {
    const [onSelect, setOnSelect] = useState<string>('Newest');

    const { requireLoginModal, onClickPostArtworkWithoutLogin, closeModal } =
        useHandleRequireLoginModal();

    useEffect(() => {
        accessToken = parseCookie()('accessToken');
    }, []);

    const handleFilter = ({ currentTarget }: React.MouseEvent) => {
        setOnSelect(currentTarget.textContent || 'Newest');
    };

    const buildButtons = () => {
        return accessToken ? (
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
                <BlackButton onClick={onClickPostArtworkWithoutLogin}>
                    Hold Exhibition
                </BlackButton>
                <BlackButton onClick={onClickPostArtworkWithoutLogin}>
                    Post Artwork
                </BlackButton>
            </>
        );
    };

    return (
        <Layout>
            <TopContainer>
                <ListFilter handleFilter={handleFilter} select={onSelect} />
                <Buttons>{buildButtons()}</Buttons>
            </TopContainer>
            <ExhibitionList filter={onSelect} />
            {requireLoginModal && <RequireLoginModal close={closeModal} />}
        </Layout>
    );
};

export interface FilterProps {
    select: boolean;
}

export default ExhibitionPage;
