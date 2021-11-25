import React from 'react';
import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext, GetStaticPaths } from 'next';

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

export const getServerSideProps: GetServerSideProps = async ({ params }: GetServerSidePropsContext) => {
    const id = params!.id as string;
    const exhibition = (await getExhibition(id)).data;
    return { props: { exhibition: exhibition } };
};

export default ExhibitionDetailPage;
