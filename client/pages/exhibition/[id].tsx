import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Layout from '@components/common/Layout';
import { Exhibition } from 'interfaces';
import { getExhibition } from '@utils/networking';

const ExhibitionDetailPage = () => {
    const { id } = useRouter().query;
    const [exhibition, setExhibition] = useState<Exhibition | null>(null);

    useEffect(() => {
        getExhibition((id as string))
            .then((res) => setExhibition(res.data));
    }, [])

    return (
        <div>
            <Head>
                <title>벽전 - 전시회 탐색</title>
            </Head>
            <Layout>{exhibition && JSON.parse(JSON.stringify(exhibition!.contents))}</Layout>
        </div>
    );
};

export default ExhibitionDetailPage;
