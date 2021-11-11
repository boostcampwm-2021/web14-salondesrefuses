import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { Auction } from 'interfaces';
import Layout from '@components/common/Layout';
import ItemDetail from '@components/Auction/ItemDetail';
import { GlobalStore } from '@store/GlobalStore';
import { getAuction } from '@utils/networking';

const AuctionDetailPage = ({ auction }: { auction: Auction }) => {
    const { artwork, artist } = auction;
    const { title } = artwork;
    const { name } = artist;

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, []);

    return (
        <>
            <GlobalStore>
                <Head>
                    <title>
                        Auction - {title} ({name}, {'2018'})
                    </title>
                    <meta name="경매" content="경매경매" />
                </Head>
                <Layout>
                    <Container>
                        <Background
                            src={artwork.croppedImage}
                        />
                        <Grid>
                            <section>
                                <img src={artwork.croppedImage} />
                            </section>
                            <ItemDetail auction={auction}/>
                        </Grid>
                    </Container>
                </Layout>
            </GlobalStore>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const artworkId = (params as { id: string }).id;
    const auction = await getAuction(Number(artworkId));

    return {
        props: {
            auction: auction.data,
        },
    };
};

const Container = styled.div`
    height: 100vh;
    position: relative;
    top: -100px;
    background-color: black;
    width: 100%;
    display: flex;
    align-items: center;
`;

const Grid = styled.div`
    width: 100%;
    height: 80%;
    z-index: 300;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    gap: 40px;

    & > section {
        height: 80%;
    }

    & section {
        width: 90%;
    }

    & > section:nth-of-type(1) {
        justify-self: center;
        display: flex;
        align-items: center;
        justify-content: center;

        & img {
            border: 5px solid ${(props) => props.theme.color.white};
            box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.3);
        }
    }
`;

const Background = styled.img`
    position: absolute;
    width: 100%;
    height: 100vh;
    filter: blur(60px);
    transform: scale(1.2);
`;

export default AuctionDetailPage;
