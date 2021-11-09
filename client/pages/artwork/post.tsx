import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '@components/common/Layout';

import Uploader from '@components/Artwork/Uploader';
import NewArtwork from '@components/Artwork/NewArtwork';

const NewArtworkPage = () => {
    const [newImage, setNewImage] = useState<File | null>(null);

    const handleNewImage = (image: File) => {
        setNewImage(image);
    };
    return (
        <>
            <Head>
                <title>벽전 - 새 작품 등록</title>
                <meta name="description" content="새 작품 등록 페이지입니다." />
            </Head>
            <Layout>
                {newImage ? (
                    <NewArtwork image={newImage} />
                ) : (
                    <Uploader handleNewImage={handleNewImage} />
                )}
            </Layout>
        </>
    );
};

export default NewArtworkPage;
