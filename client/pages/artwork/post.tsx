import React, { useState } from 'react';
import styled from '@emotion/styled';
import Head from 'next/head';
import Layout from '@components/common/Layout';

import Uploader from '@components/Artwork/Uploader';
import NewArtwork from '@components/Artwork/NewArtwork';

const NewArtworkPage = () => {
    const [newImage, setNewImage] = useState<File | null>(null);
    return (
        <Container>
            {/* NavBar */}
            <Head>
                <title>벽전 - 새 작품 등록</title>
                <meta name="description" content="새 작품 등록 페이지입니다." />
            </Head>
            <Layout>
                {newImage ? (
                    <NewArtwork image={newImage} />
                ) : (
                    <Uploader setNewImage={setNewImage} />
                )}
            </Layout>
        </Container>
    );
};

const Container = styled.div``;

export default NewArtworkPage;
