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
    const imageRef = useRef<HTMLImageElement | null>(null);
    const magnifierRef = useRef<HTMLImageElement | null>(null);
    const { artwork, artist } = auction;
    const { title, originalImage } = artwork;
    const { name } = artist;
    const zoomLevel = 2;

    const getCursorPosition = (e: MouseEvent) => {
        const { top, left } = imageRef.current?.getBoundingClientRect()!;
        const { pageX, pageY } = e;

        return {
            x: pageX - left,
            y: pageY - top,
        };
    };

    const moveMagnifier = (e: MouseEvent) => {
        const radius = Number(window.getComputedStyle(magnifierRef.current!)
            .width
            .split('px')[0]) / 2;
        let { x, y } = getCursorPosition(e);
        let { width, height } = window.getComputedStyle(imageRef.current!);
        width = width.split('px')[0];
        height = height.split('px')[0];

        if(x < 0) x = 0;
        if(y < 0) y = 0;
        if(x > Number(width)) x = Number(width);
        if(y > Number(height)) y = Number(height);

        magnifierRef.current!.style.top = `${y}px`;
        magnifierRef.current!.style.left = `${x}px`;
        magnifierRef.current!.style.backgroundPosition = `-${(x * zoomLevel) - radius}px -${(y * zoomLevel) - radius}px`;
    };

    const showMagnify = () => {
        magnifierRef.current!.classList.toggle('setVisible');
    }

    useEffect(() => {
        let { width, height } = window.getComputedStyle(imageRef.current!);
        width = width.split('px')[0];
        height = height.split('px')[0];

        magnifierRef.current!.style.backgroundSize =
            `${Number(width) * zoomLevel}px ${Number(height) * zoomLevel}px`;

        imageRef.current?.addEventListener('mousemove', moveMagnifier);
        magnifierRef.current?.addEventListener('mousemove', moveMagnifier);

        return(() => {
            imageRef.current?.removeEventListener('mousemove', moveMagnifier);
            magnifierRef.current?.removeEventListener('mousemove', moveMagnifier);
        });
    }, [])

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
                        <Background src={originalImage} />
                        <Grid>
                            <section>
                                <ImageWrapper>
                                    <Magnifier
                                        imagePath={originalImage}
                                        onClick={() => showMagnify()}
                                        ref={magnifierRef}
                                    />
                                    <Image
                                        src={originalImage}
                                        onClick={() => showMagnify()}
                                        ref={imageRef}
                                    />
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
    display: flex;
    position: relative;
`;

const Image = styled.img`
    max-width: 45vh;
    border: 5px solid ${(props) => props.theme.color.white};
    box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.3);
`;

interface MagnifierProps {
    imagePath: string;
}

const Magnifier = styled.div<MagnifierProps>`
    width: 100px;
    height: 100px;
    position: absolute;
    z-index: 200;
    border: 2px solid rgba(255, 255, 255, 0.9);
    background-image: url("${props => props.imagePath}");
    background-repeat: no-repeat;
    visibility: hidden;
    
    &.setVisible {
        visibility: visible;
    }
`;

const Background = styled.img`
    position: absolute;
    width: 100%;
    height: 100vh;
    filter: blur(60px);
`;

export default AuctionDetailPage;
