import React, { useState } from 'react';
import styled from '@emotion/styled';
import Head from 'next/head';

import Form from '@components/Exhibition/Form';
import ArtworkSelector from '@components/Exhibition/ArtworkSelector';
import Layout from '@components/common/Layout';
import { Description, NextButton, Title } from '@components/Exhibition/style';
import Editor from '@components/Exhibition/Editor';
import useInputExhibition from '@hooks/useInputExhibition';

const ExhibitionPostPage = () => {
    const [currentPage, setCurrentPage] = useState<'FORM' | 'EDITOR'>('FORM');
    const { formInput, onChangeContents, contents, onClickHold } =
        useInputExhibition();
    const [thumbnail, setThumbnail] = useState<File | null>(null);

    const onClickNextButton = () => {
        setCurrentPage('EDITOR');
    };

    const handleBackButton = () => {
        setCurrentPage('FORM');
    };

    const onChangeThumbnail = (current: HTMLInputElement | null) => {
        current!.files && setThumbnail(current!.files[0]);
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
                            <Form
                                formInput={formInput}
                                thumbnail={thumbnail}
                                onChangeThumbnail={onChangeThumbnail}
                            />
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

    width: 1180px;
    margin: 50px auto;
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;

    width: 1180px;
    margin: 0 auto;
    margin-top: 40px;

    & > h1 {
        font: ${(props) => props.theme.font.textEnLg};
        color: ${(props) => props.theme.color.placeholder};
        margin-bottom: 8px;
        margin: 0;
    }
`;
  
export default ExhibitionPostPage;
