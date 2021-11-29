import React from 'react';
import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { Auction } from 'interfaces';
import Layout from '@components/common/Layout';
import ItemDetail from '@components/Auction/ItemDetail';
import { getAuction } from 'service/networking';
import useMagnifier from '@hooks/useMagnifier';

const AuctionDetailPage = ({ auction }: { auction: Auction }) => {
    const { imageRef, magnifierRef, showMagnify, imgOnLoadHandle } = useMagnifier();

    const { artwork, artist } = auction;
    const { title, originalImage, year } = artwork;
    const { name } = artist;

    return (
        <NonScrollable>
            <Head>
                <title>
                    Auction - {title} ({name}, {year})
                </title>
                <meta name="경매" content="경매경매" />
            </Head>
            <Layout>
                <Container>
                    <Background src={originalImage} />
                    <Grid>
                        <section>
                            <ImageWrapper>
                                <Magnifier imagePath={originalImage} onClick={() => showMagnify()} ref={magnifierRef} />
                                <Image
                                    src={originalImage}
                                    onClick={() => showMagnify()}
                                    ref={imageRef}
                                    onLoad={imgOnLoadHandle}
                                />
                                <span>click image to zoom</span>
                            </ImageWrapper>
                        </section>
                        <ItemDetail auction={auction} />
                    </Grid>
                </Container>
            </Layout>
        </NonScrollable>
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

const NonScrollable = styled.div`
    height: 100vh;
    overflow: hidden;
`;

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
    flex-direction: column;
    align-items: center;

    & > span {
        margin-top: 20px;
        font: ${(props) => props.theme.font.textEnBase};
        animation: text-color 4s ease infinite;

        @keyframes text-color {
            0% {
                color: rgba(0, 0, 0, 0.3);
            }
            50% {
                color: rgba(255, 255, 255, 0.3);
            }
            100% {
                color: rgba(0, 0, 0, 0.3);
            }
        }
    }
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
    position: absolute;
    z-index: 200;
    width: 150px;
    height: 150px;
    border: 2px solid rgba(255, 255, 255, 0.9);
    background-image: url('${(props) => props.imagePath}');
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
