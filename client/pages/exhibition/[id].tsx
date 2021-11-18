import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Layout from '@components/common/Layout';
import { Exhibition } from 'interfaces';
import { getExhibition } from '@utils/networking';
import ExhibitionDetail from '@components/Exhibition/ExhbitionDetail';
const ExhibitionDetailPage = () => {
    const { id } = useRouter().query;
    const [exhibition, setExhibition] = useState<Exhibition | null>(null);

    useEffect(() => {
        getExhibition(id as string).then((res) => {
            return setExhibition(res.data);
        });
    }, []);

    return (
        <div>
            <Head>
                <title>벽전 - 전시회 탐색</title>
            </Head>
            <Layout>{exhibition && <ExhibitionDetail exhibition={exhibition} />}</Layout>
        </div>
    );
};

// export const getStaticProps: GetStaticProps = async () => {
//     const ExhibitionData = (await getRandomExhibitions()).data;

//     return {
//         props: {
//             ExhibitionsData: JSON.parse(JSON.stringify(ExhibitionsData)),
//             AuctionsData: JSON.parse(JSON.stringify(AuctionsData)),
//         } as Props,
//     };
// };

export default ExhibitionDetailPage;
