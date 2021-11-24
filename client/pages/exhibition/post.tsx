import React, { useState } from 'react';
import styled from '@emotion/styled';
import Head from 'next/head';

import Form from '@components/Exhibition/FormPage';
import ArtworkSelector from '@components/Exhibition/ArtworkSelectorWrapper';
import Layout from '@components/common/Layout';
import { Description, NextButton, Title } from '@components/Exhibition/style';
import Editor from '@components/Exhibition/EditorPage';
import useInputExhibition from '@hooks/useInputExhibition';

const ExhibitionPostPage = () => {
    const [currentPage, setCurrentPage] = useState<'FORM' | 'EDITOR'>('FORM');
    const { formInput, onClickHold } = useInputExhibition();

    const onClickNextButton = () => {
        setCurrentPage('EDITOR');
    };

    const handleBackButton = () => {
        setCurrentPage('FORM');
    };

    return (
        <div>
            <Head>
                <title>벽전 - 전시회 등록</title>
            </Head>
            <Layout>
                {currentPage === 'FORM' ? (
                    <>
                        <Title>
                            <h1>Hold Exhibition</h1>
                            <Description>나만의 전시회를 만들어 보세요!</Description>
                        </Title>
                        <Container>
                            <Form formInput={formInput} />
                            <ArtworkSelector />
                            <NextButton onClick={onClickNextButton}>Next</NextButton>
                        </Container>
                    </>
                ) : (
                    <Editor backButtonHandler={handleBackButton} holdExhibition={onClickHold} />
                )}
            </Layout>
        </div>
    );
};

const Container = styled.div`
    display: flex;
    position: relative;

    width: 1180px;
    margin: 50px auto;
`;

export default ExhibitionPostPage;
