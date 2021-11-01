import React from 'react';
import styled from '@emotion/styled';
import Head from 'next/head';

const NewArtworkPage = () => {
    return (
        <Container>
            {/* NavBar */}
            <Head>
                <title>벽전 - 새 작품 등록</title>
                <meta name="description" content="새 작품 등록 페이지입니다." />
            </Head>
        </Container>
    );
};

const Container = styled.div``;

export default NewArtworkPage;
