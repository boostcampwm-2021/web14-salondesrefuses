import type { NextPage } from 'next';
import { GetStaticProps } from 'next';

import Mobile from '@components/Home/Mobile';
import Pc from '@components/Home/Pc';
import { isMobile } from 'utils/isMobile';
import { getRandomAuctions, getRandomExhibitions } from 'utils/networking';
import {
    fakeRandomAuctions,
    randomAuctionType,
    randomExhibitionType,
} from 'constants/fakeDatas';

const Home: NextPage = (props) => {
    return isMobile() ? <Mobile /> : <Pc props={props} />;
};
export const getStaticProps: GetStaticProps = async () => {
    const ExhibitionsData = (await getRandomExhibitions()).data.map(
        (exhibition: randomExhibitionType) => JSON.stringify(exhibition),
    );

    // const AuctionData = JSON.stringify((await getRandomAuctions()).data);
    const AuctionsData = fakeRandomAuctions.map((auction: randomAuctionType) =>
        JSON.stringify(auction),
    );

    return {
        props: { ExhibitionsData, AuctionsData },
    };
};

export default Home;
