import React from 'react';
import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import Layout from '@components/common/Layout';
import ExhibitionDetail from '@components/Exhibition/ExhbitionDetail';
import { getExhibition } from '@service/networking';
import { Exhibition } from 'interfaces';
import ErrorBoundary from '@components/common/ErrorBoundary';
import Fallback from '@components/common/Fallback';

const ExhibitionDetailPage = ({ exhibition }: { exhibition: Exhibition }) => {
    return (
        <div>
            <Head>
                <title>벽전 - {exhibition.title}</title>
            </Head>
            <Layout>
                <ErrorBoundary fallback={<Fallback />}>
                    <ExhibitionDetail exhibition={exhibition} />
                </ErrorBoundary>
            </Layout>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }: GetServerSidePropsContext) => {
    const id = params!.id as string;
    const exhibition = (await getExhibition(id)).data;
    return { props: { exhibition: exhibition } };
};

export default ExhibitionDetailPage;
