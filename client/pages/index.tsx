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

interface Props {
    ExhibitionsData: string[];
    AuctionsData: string[];
}

const Home: NextPage<Props> = ({ ExhibitionsData, AuctionsData }: Props) => {
    return isMobile() ? (
        <Mobile />
    ) : (
        <Pc ExhibitionsData={ExhibitionsData} AuctionsData={AuctionsData} />
    );
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
        props: { ExhibitionsData, AuctionsData } as Props,
    };
};

export default Home;
