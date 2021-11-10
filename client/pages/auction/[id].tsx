import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { Artwork } from 'interfaces';
import Layout from '@components/common/Layout';
import ItemDetail from '@components/Auction/ItemDetail';
import { GlobalStore } from '../../store/GlobalStore';

const AuctionDetailPage = ({ artwork }: { artwork: Artwork }) => {
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
                        Auction - {'Sky Study 3'} ({'Lisa Beck'}, {'2018'})
                    </title>
                    <meta name="경매" content="경매경매" />
                </Head>
                <Layout>
                    <Container>
                        <Background
                            src={
                                'https://d7hftxdivxxvm.cloudfront.net/?resize_to=fit&width=210&height=276&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FVju3jVJD5yaSEb1vTQbA1w%2Flarge.jpg'
                            }
                        />
                        <Grid>
                            <section>
                                <img src="" />
                            </section>
                            <ItemDetail />
                        </Grid>
                    </Container>
                </Layout>
            </GlobalStore>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const artworkId = (params as { id: string }).id;

    return {
        props: {},
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
