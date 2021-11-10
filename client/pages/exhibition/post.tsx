import React from 'react';
import styled from '@emotion/styled';
import Head from 'next/head';

import Form from '@components/Exhibition/Form';
import ArtworkSelector from '@components/Exhibition/ArtworkSelector';
import Layout from '@components/common/Layout';
import { Description, NextButton } from '@components/Exhibition/style';

const ExhibitionPostPage = () => {
    return (
        <div>
            <Head>
                <title>벽전 - 전시회 등록</title>
            </Head>
            <Layout>
                <Title>
                    <h1>Hold Exhibition</h1>
                    <Description>나만의 전시회를 만들어 보세요!</Description>
                </Title>
                <Container>
                    <Form />
                    <ArtworkSelector />
                    <NextButton>Next</NextButton>
                </Container>
            </Layout>
        </div>
    );
};

const Container = styled.div`
    display: flex;
    position: relative;

    width: 920px;
    margin: 50px auto;
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;

    width: 920px;
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
