import React from 'react';
import Head from 'next/head';
import { GetStaticPaths } from 'next';

import Layout from '@components/common/Layout';
import ExhibitionDetail from '@components/Exhibition/ExhbitionDetail';
import { getExhibitionIds, getExhibition } from '@service/networking';
import { Exhibition } from 'interfaces';

const ExhibitionDetailPage = ({ exhibition }: { exhibition: Exhibition }) => {
    return (
        <div>
            <Head>
                <title>벽전 - 전시회 탐색</title>
            </Head>
            <Layout>{exhibition && <ExhibitionDetail exhibition={exhibition} />}</Layout>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const exhibitionIds = await getExhibitionIds();
    const paths = exhibitionIds.map((id) => ({
        params: { id: id.toString() },
    }));

    return { paths, fallback: false };
};

interface Params {
    params: {
        id: string;
    };
}
export const getStaticProps = async ({ params }: Params) => {
    const exhibition = (await getExhibition(params.id)).data;
    return { props: { exhibition: exhibition } };
};

export default ExhibitionDetailPage;
