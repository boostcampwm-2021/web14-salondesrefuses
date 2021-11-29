import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Form from '@components/Exhibition/FormPage';
import ArtworkSelector from '@components/Exhibition/ArtworkSelectorWrapper';
import Layout from '@components/common/Layout';
import { Description, NextButton, Title } from '@components/Exhibition/style';
import Editor from '@components/Exhibition/EditorPage';
import useInputExhibition from '@hooks/useInputExhibition';
import { EditorElementProp } from '@components/Exhibition/EditorPage/Editor/types';
import { useEditorImageState, useSelectedImageState } from '@store/editorImageState';
import useToast from '@hooks/useToast';

const ExhibitionPostPage = () => {
    const [currentPage, setCurrentPage] = useState<'FORM' | 'EDITOR'>('FORM');
    const [elements, setElements] = useState<EditorElementProp[]>([]);
    const { formInput, onClickHold } = useInputExhibition();

    const [selectedImages, setSelectedImages] = useSelectedImageState();
    const [editorImageState, setEditorImageState] = useEditorImageState();
    const showToast = useToast({
        onSuccess: '',
        onFailed: '제목 / 기간 / 썸네일 / 작품을 선택해주세요.',
    });

    const setElementList = (elementList: EditorElementProp[]) => {
        setElements(elementList);
    };

    const onClickNextButton = () => {
        const { title, startAt, endAt, thumbnailImage } = formInput;
        if (!title || !startAt || !endAt || !thumbnailImage || !selectedImages.length) {
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
                            <ArtworkSelector />
                            <NextButton onClick={onClickNextButton}>Next</NextButton>
                        </Container>
                    </>
                ) : (
                    <Editor
                        elements={elements}
                        setElementList={setElementList}
                        backButtonHandler={handleBackButton}
                        holdExhibition={onClickHold}
                        isEdit={false}
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
