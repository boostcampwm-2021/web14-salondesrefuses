import React from 'react';
import styled from '@emotion/styled';
import { Artwork } from 'interfaces';

interface IResultDetail {
    artwork: Artwork;
    token: string | undefined;
}

const ResultDetail = ({ artwork, token }: IResultDetail) => {
    return (
        <Container>
            <Box>
                <span>Title</span>
                <div>{artwork.title}</div>
            </Box>
            <Box>
                <span>Description</span>
                <div>{artwork.description}</div>
            </Box>
            <Box>
                <span>Type</span>
                <div>{artwork.type}</div>
            </Box>
            <Box>
                <span>NFT Token</span>
                <div>{token && token}</div>
            </Box>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    min-width: 300px;
    backgrond: black;
    z-index: 200;
    overflow-y: scroll;
    height: 100%;
    padding: 5%;

    ::-webkit-scrollbar {
        display: none;
    }
`;

const Box = styled.section`
    padding: 15px 20px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    color: white;
    margin-bottom: 20px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);

    & span {
        display: inline-block;
        font: ${(props) => props.theme.font.textEnSm};
        font-size: 16px;
        border-bottom: 1px solid white;
        margin-bottom: 8px;
    }

    & div {
        font: ${(props) => props.theme.font.textEnLg};
        font-size: 20px;
        padding-bottom: 5px;
    }
`;

export default ResultDetail;
