import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Link from 'next/link';

import Layout from '@components/common/Layout';
import Card from '@components/common/Card';
import {
    TopContainer,
    FilterWrapper,
    Filter,
    Buttons,
    BlackButton,
    ExhibitionList,
} from '../../components/Exhibition/style';
import { ExhibitionCardProps } from '@const/card-type';
import { getExhibitions } from '@utils/networking';
import useHandleRequireLoginModal from '@hooks/useHandleRequireLoginModal';
import RequireLoginModal from '@components/common/RequireLoginModal';
import parseCookie from '@utils/parseCookie';
import { Button, SpaceBetween } from '@styles/common';

let accessToken: string | undefined;

const ExhibitionPage: NextPage = () => {
    const [onSelect, setOnSelect] = useState<string>('Newest');
    const [exhibitions, setExhibitions] = useState<ExhibitionCardProps[]>([]);
    const [page, setPage] = useState(0);

    const { requireLoginModal, onClickPostArtworkWithoutLogin, closeModal } =
        useHandleRequireLoginModal();

    useEffect(() => {
        accessToken = parseCookie()('accessToken');
    }, []);

    useEffect(() => {
        getExhibitions(onSelect.toLowerCase(), page).then((res) =>
            setExhibitions([...exhibitions, ...res.data]),
        );
    }, [page]);

    useEffect(() => {
        getExhibitions(onSelect.toLowerCase(), page).then((res) =>
            setExhibitions(res.data),
        );
    }, [onSelect]);

    const onClickFilter = ({ currentTarget }: React.MouseEvent) => {
        setOnSelect(currentTarget.textContent || 'Newest');
    };

    return (
        <Layout>
            <TopContainer>
                <FilterWrapper>
                    <div>
                        <Filter
                            select={onSelect === 'Newest'}
                            onClick={onClickFilter}
                        >
                            Newest
                        </Filter>
                    </div>
                    <div>
                        <Filter
                            select={onSelect === 'Popular'}
                            onClick={onClickFilter}
                        >
                            Popular
                        </Filter>
                    </div>
                    <div>
                        <Filter
                            select={onSelect === 'Deadline'}
                            onClick={onClickFilter}
                        >
                            Deadline
                        </Filter>
                    </div>
                </FilterWrapper>

                <Buttons>
                    {accessToken ? (
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
                            <BlackButton
                                onClick={onClickPostArtworkWithoutLogin}
                            >
                                Hold Exhibition
                            </BlackButton>
                            <BlackButton
                                onClick={onClickPostArtworkWithoutLogin}
                            >
                                Post Artwork
                            </BlackButton>
                        </>
                    )}
                </Buttons>
            </TopContainer>

            <ExhibitionList>
                {exhibitions.map((exihibition, idx) => (
                    <Card key={idx} width="lg" content={exihibition} />
                ))}
            </ExhibitionList>
            {requireLoginModal && <RequireLoginModal close={closeModal} />}
        </Layout>
    );
};

export interface FilterProps {
    select: boolean;
}

export default ExhibitionPage;
