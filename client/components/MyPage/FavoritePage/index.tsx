import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Artwork } from 'interfaces';
import { getUserArtworkInterest } from '@utils/networking';
import Card from '@components/common/Card';

const FavoritePage = () => {
    const [artworks, setArtworks] = useState<Artwork[]>([]);

    useEffect(() => {
        getUserArtworkInterest().then((res) => {
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

export default FavoritePage;
