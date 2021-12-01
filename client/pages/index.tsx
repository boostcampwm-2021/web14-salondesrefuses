import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';

import Pc from '@components/Home/Pc';
import { getRandomAuctions, getRandomExhibitions } from 'service/networking';
import { AuctionCardProps, ExhibitionCardProps } from '@const/card-type';

interface Props {
    ExhibitionsData: ExhibitionCardProps[];
    AuctionsData: AuctionCardProps[];
}

const Home: NextPage<Props> = ({ ExhibitionsData, AuctionsData }: Props) => {
    return <Pc ExhibitionsData={ExhibitionsData} AuctionsData={AuctionsData} />;
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
