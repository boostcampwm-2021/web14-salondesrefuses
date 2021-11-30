import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Head from 'next/head';

import Form from '@components/Exhibition/FormPage';
import ArtworkSelector from '@components/Exhibition/ArtworkSelectorWrapper';
import Layout from '@components/common/Layout';
import { Description, NextButton, Title } from '@components/Exhibition/style';
import Editor from '@components/Exhibition/EditorPage';
import useInputExhibition from '@hooks/useInputExhibition';
import { EditorElementProp } from '@components/Exhibition/EditorPage/Editor/types';
import { useEditorImageState, useSelectedImageState } from '@store/editorImageState';
import useToast from '@hooks/useToast';
import CSuspense from '@components/common/Suspense';
import Fallback from '@components/common/Fallback';
import ErrorBoundary from '@components/common/ErrorBoundary';

const ExhibitionPostPage = () => {
    const [currentPage, setCurrentPage] = useState<'FORM' | 'EDITOR'>('FORM');
    const [elements, setElements] = useState<EditorElementProp[]>([]);

    const [selectedImages, setSelectedImages] = useSelectedImageState();
    const [editorImageState, setEditorImageState] = useEditorImageState();
    const showToast = useToast({
        onSuccess: '',
        onFailed: '제목 / 기간 / 썸네일 / 작품을 선택해주세요.',
    });

    const setElementList = (elementList: EditorElementProp[]) => {
        setElements(elementList);
    };

    const { formInput, onClickHold } = useInputExhibition();

    const onClickNextButton = () => {
        const { title, startAt, endAt, thumbnail } = formInput;
        if (!title || !startAt || !endAt || !thumbnail || !selectedImages.length) {
            showToast('failed');
            return;
        }

        setCurrentPage('EDITOR');
    };

    const handleBackButton = () => {
        setCurrentPage('FORM');
    };

    useEffect(() => {
        return () => {
            setSelectedImages([]);
            setEditorImageState([]);
        };
    }, []);

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
                            <ErrorBoundary fallback={<div>...failed</div>}>
                                <CSuspense fallback={<Fallback />}>
                                    <ArtworkSelector />
                                </CSuspense>
                            </ErrorBoundary>
                            <NextButton onClick={onClickNextButton}>Next</NextButton>
                        </Container>
                    </>
                ) : (
                    <Editor
                        elements={elements}
                        setElementList={setElementList}
                        backButtonHandler={handleBackButton}
                        holdExhibition={onClickHold}
                    />
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
