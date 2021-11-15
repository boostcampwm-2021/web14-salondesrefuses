import React, { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { Auction } from 'interfaces';
import Layout from '@components/common/Layout';
import ItemDetail from '@components/Auction/ItemDetail';
import { GlobalStore } from '@store/GlobalStore';
import { getAuction } from '@utils/networking';

const AuctionDetailPage = ({ auction }: { auction: Auction }) => {
    const [zoom, setZoom] = useState(false);
    const magnifierRef = useRef<HTMLImageElement | null>(null);
    const sectionRef = useRef<HTMLImageElement | null>(null);

    const { artwork, artist } = auction;
    const { title, originalImage } = artwork;
    const { name } = artist;

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, []);

    const onHoverImage = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!zoom || !magnifierRef.current) return;
        const { offsetX, offsetY } = e.nativeEvent;
        const { top, left } = sectionRef.current?.getBoundingClientRect()!;
        magnifierRef.current.style.objectPosition = `${-(offsetX * 1.5) + 50}px ${-(offsetY * 1.5) + 50}px`;

        magnifierRef.current.parentElement!.style.top = `${e.clientY - top + 5}px`;
        magnifierRef.current.parentElement!.style.left = `${e.clientX - left + 5}px`;
    };

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
                        <Background src={originalImage} />
                        <Grid>
                            <section ref={sectionRef}>
                                <ImageWrapper onMouseMove={onHoverImage}>
                                    <Image
                                        src={originalImage}
                                        onClick={() => {
                                            setZoom(!zoom);
                                        }}
                                    />
                                    {zoom && (
                                        <Magnifier>
                                            <img
                                                src={originalImage}
                                                alt=""
                                                ref={magnifierRef}
                                            />
                                        </Magnifier>
                                    )}
                                </ImageWrapper>
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
    top: -70px;
    background-color: black;
    width: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;
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
        position: relative;
    }

    & section {
        width: 90%;
    }

    & > section:nth-of-type(1) {
        justify-self: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const ImageWrapper = styled.div`
    justify-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Image = styled.img`
    max-width: 45vh;
    border: 5px solid ${(props) => props.theme.color.white};
    box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.3);
`;

const Magnifier = styled.div`
    width: 100px;
    height: 100px;
    position: absolute;
    z-index: 200;
    background-color: black;
    overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.9);

    & > img {
        object-fit: none;
    }
`;

const Background = styled.img`
    position: absolute;
    width: 100%;
    height: 100vh;
    filter: blur(60px);
`;

export default AuctionDetailPage;
