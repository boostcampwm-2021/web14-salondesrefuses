import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Web3 from 'web3';

import { Artwork } from 'interfaces';
import { getUserArtwork } from '@utils/networking';

const ArtworkPage = () => {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    useEffect(() => {
        getUserArtwork().then((res) => {
            setArtworks(res.data);
        });
    }, []);
    return <Container></Container>;
};

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
`;

export default ArtworkPage;
