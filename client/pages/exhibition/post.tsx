import React, { useState } from 'react';
import styled from '@emotion/styled';
import Head from 'next/head';

import Form from '@components/Exhibition/Form';
import ArtworkSelector from '@components/Exhibition/ArtworkSelector';
import Layout from '@components/common/Layout';
import { Description, NextButton, Title } from '@components/Exhibition/style';
import Editor from '@components/Exhibition/Editor';

const ExhibitionPostPage = () => {
    const [currentPage, setCurrentPage] = useState<'FORM' | 'EDITOR'>('FORM');

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
                            <Description>
                                나만의 전시회를 만들어 보세요!
                            </Description>
                        </Title>
                        <Container>
                            <Form />
                            <ArtworkSelector />
                            <NextButton onClick={onClickNextButton}>
                                Next
                            </NextButton>
                        </Container>
                    </>
                ) : (
                    <Editor backbuttonHandler={handleBackButton} />
                )}
            </Layout>
        </div>
    );
};

const Container = styled.div`
    display: flex;
    position: relative;

    width: 1120px;
    margin: 50px auto;
`;

export default ExhibitionPostPage;
