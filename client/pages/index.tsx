import type { NextPage } from 'next';
import { GetStaticProps } from 'next';

import Mobile from '@components/Home/Mobile';
import Pc from '@components/Home/Pc';
import { isMobile } from 'utils/isMobile';
import { getRandomExhibitions } from 'utils/networking';

const Home: NextPage = (data) => {
    return isMobile() ? <Mobile /> : <Pc data={data} />;
};
export const getStaticProps: GetStaticProps = async () => {
    const ExhibitionData = await (await getRandomExhibitions()).data;

    return {
        props: { ExhibitionData },
    };
};

export default Home;
