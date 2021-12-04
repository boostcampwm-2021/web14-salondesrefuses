import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Head from 'next/head';

import ArtworkSelector from '@components/Exhibition/ArtworkSelectorWrapper';
import CSuspense from '@components/common/Suspense';
import Editor from '@components/Exhibition/EditorPage';
import ErrorBoundary from '@components/common/ErrorBoundary';
import Fallback from '@components/common/Fallback';
import Form from '@components/Exhibition/FormPage';
import Layout from '@components/common/Layout';
import { Artwork } from 'interfaces';
import { Description, NextButton, Title } from '@components/Exhibition/style';
import { EditorElementProp } from '@components/Exhibition/EditorPage/Editor/types';
import { EDITOR_PAGE_STATE } from './edit';
import { ToastMsg } from '@const/toast-message';
import { useEditorImageState, useSelectedImageState } from '@store/editorImageState';
import useToast from '@hooks/useToast';
import useInputExhibition from '@hooks/useInputExhibition';

const ExhibitionPostPage = () => {
    const [currentPage, setCurrentPage] = useState<string>('FORM');
    const [elements, setElements] = useState<EditorElementProp[]>([]);
    const { formInput, onClickHold } = useInputExhibition();

    const [selectedImages, setSelectedImages] = useSelectedImageState();
    const [_, setEditorImageState] = useEditorImageState();
    const showToast = useToast({
        onSuccess: '',
        onFailed: ToastMsg.NOT_FILLED_EVERY_FORMS,
    });
    const [editorSize, setEditorSize] = useState<number>(INITIAL_EDITOR_SIZE);

    const saveEditorSize = (flag: boolean) => {
        setEditorSize((prev) => (flag ? prev + DIFF_SIZE_OF_GAP : prev - DIFF_SIZE_OF_GAP));
    };

    const setElementList = (elementList: EditorElementProp[]) => {
        setElements(elementList);
    };

    const onClickNextButton = () => {
        if (isEditorFormFilled(formInput, selectedImages)) {
            showToast('failed');
            return;
        }
        setCurrentPage(EDITOR_PAGE_STATE.EDITOR);
    };

    const handleBackButton = () => {
        setCurrentPage(EDITOR_PAGE_STATE.FORM);
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
                {currentPage === EDITOR_PAGE_STATE.FORM ? (
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
                        handleBackButton={handleBackButton}
                        holdExhibition={onClickHold}
                        isEdit={false}
                        saveEditorSize={saveEditorSize}
                        editorSize={editorSize}
                    />
                )}
            </Layout>
        </div>
    );
};

const DIFF_SIZE_OF_GAP = 300;
const INITIAL_EDITOR_SIZE = 1000;

const isEditorFormFilled = ({ title, endAt, startAt, thumbnailImage }: any, selectedImages: Artwork[]) => {
    if (!title || !startAt || !endAt || !thumbnailImage || !selectedImages.length) return true;
    return false;
};

const Container = styled.div`
    display: flex;
    position: relative;

    width: 1180px;
    margin: 50px auto;
`;

export default ExhibitionPostPage;
