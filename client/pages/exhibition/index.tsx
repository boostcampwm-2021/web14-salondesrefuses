import React, { useState, useEffect, useCallback } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';

import Layout from '@components/common/Layout';
import Card from '@components/Card';
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

const ExhibitionPage: NextPage = () => {
    const [onSelect, setOnSelect] = useState<string>('Newest');
    const [exhibitions, setExhibitions] = useState<ExhibitionCardProps[]>([]);
    const [page, setPage] = useState(0);

    const {
        accessToken,
        requireLoginModal,
        onClickPostArtworkWithoutLogin,
        closeModal,
    } = useHandleRequireLoginModal();

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
                    <BlackButton>Hold Exhibition</BlackButton>
                    {accessToken ? (
                        <Link href="/artwork/post">
                            <BlackButton>Post Artwork</BlackButton>
                        </Link>
                    ) : (
                        <BlackButton onClick={onClickPostArtworkWithoutLogin}>
                            Post Artwork
                        </BlackButton>
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
