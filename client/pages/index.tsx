import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';

import Mobile from '@components/Home/Mobile';
import Pc from '@components/Home/Pc';
import { isMobile } from 'utils/isMobile';
import { getRandomAuctions, getRandomExhibitions } from 'service/networking';
import { AuctionCardProps, ExhibitionCardProps } from '@const/card-type';

interface Props {
    ExhibitionsData: ExhibitionCardProps[];
    AuctionsData: AuctionCardProps[];
}

const Home: NextPage<Props> = ({ ExhibitionsData, AuctionsData }: Props) => {
    return isMobile() ? <Mobile /> : <Pc ExhibitionsData={ExhibitionsData} AuctionsData={AuctionsData} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
    const ExhibitionsData = (await getRandomExhibitions()).data;
    const AuctionsData = (await getRandomAuctions()).data;

    return {
        props: {
            ExhibitionsData: ExhibitionsData,
            AuctionsData: AuctionsData,
        } as Props,
    };
};

export default Home;
