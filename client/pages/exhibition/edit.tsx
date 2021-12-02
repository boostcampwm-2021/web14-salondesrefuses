import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSessionState from '@store/sessionState';
import Router from 'next/router';

import Form from '@components/Exhibition/FormPage';
import ArtworkSelector from '@components/Exhibition/ArtworkSelectorWrapper';
import Layout from '@components/common/Layout';
import { Description, NextButton, Title } from '@components/Exhibition/style';
import Editor from '@components/Exhibition/EditorPage';
import useToast from '@hooks/useToast';
import useInputExhibition from '@hooks/useInputExhibition';
import { getExhibition } from '../../service/networking';
import { Exhibition } from 'interfaces';
import { EditorElementProp } from '@components/Exhibition/EditorPage/Editor/types';
import { ToastMsg } from '@const/toast-message';

const ExhibitionEditPage = () => {
    const [currentPage, setCurrentPage] = useState<'FORM' | 'EDITOR'>('FORM');
    const [exhibitionData, setExhibitionData] = useState<Exhibition | null>(null);
    const [elements, setElements] = useState<EditorElementProp[]>([]);
    const params = useRouter().query.exhibitionId;
    const session = useSessionState();

    const { formInput, onClickHold, setExhibitionInput } = useInputExhibition();

    const setElementList = (elementList: EditorElementProp[]) => {
        setElements(elementList);
    };

    const onClickNextButton = () => {
        setCurrentPage('EDITOR');
    };

    const handleBackButton = () => {
        setCurrentPage('FORM');
    };
    useEffect(() => {
        getExhibition(params as string).then((res) => {
            setElementList(JSON.parse(res.data.contents));
            return setExhibitionData(res.data);
        });
    }, []);
    useEffect(() => {
        if (!exhibitionData) return;
        console.log(exhibitionData);
        const isExhibitor = session.contents?.id === exhibitionData!.artistId;

        if (!isExhibitor) {
            useToast({
                onSuccess: '',
                onFailed: ToastMsg.NOT_AUTHORIZED,
            });
            Router.push('/hello-nextjs');
        }
    }, [exhibitionData]);
    const getExhibitionFormData = () => {
        if (!exhibitionData) return;
        return {
            title: exhibitionData.title,
            startAt: exhibitionData.startAt,
            endAt: exhibitionData.endAt,
            theme: exhibitionData.theme,
            collaborator: exhibitionData.collaborator,
            description: exhibitionData.description,
            thumbnailImage: exhibitionData.thumbnailImage,
        };
    };

    return (
        <div>
            <Head>
                <title>벽전 - 전시회 수정</title>
            </Head>
            <Layout>
                {currentPage === 'FORM' && exhibitionData ? (
                    <>
                        <Title>
                            <h1>Edit Exhibition</h1>
                            <Description>전시 수정 페이지</Description>
                        </Title>
                        <Container>
                            <Form
                                formInput={formInput}
                                oldInputData={getExhibitionFormData()}
                                setExhibitionInput={setExhibitionInput}
                            />
                            <ArtworkSelector />
                            <NextButton onClick={onClickNextButton}>Next</NextButton>
                        </Container>
                    </>
                ) : (
                    <Editor
                        handleBackButton={handleBackButton}
                        holdExhibition={onClickHold}
                        elements={elements}
                        setElementList={setElementList}
                        isEdit={true}
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

export default ExhibitionEditPage;
