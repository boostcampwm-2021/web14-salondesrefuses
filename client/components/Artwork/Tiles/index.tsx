import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { getAllArtworks } from 'utils/networking';
import ImageTile from './ImageTile';
import { Artwork } from 'interfaces';

const Tiles = () => {
    const [artworks, setArtworks] = useState<Artwork[]>([]);

    useEffect(() => {
        getAllArtworks(1).then((result) => {
            console.log(result.data);
            setArtworks(result.data);
        });
    }, []);

    return (
        <Container>
            <Grid>
                {artworks.map((item, idx: number) => (
                    <ImageTile key={idx} src={item.originalImage} />
                ))}
            </Grid>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
    margin-bottom: 50px;
`;

const Grid = styled.div`
    column-count: 4;
    width: 100%;
    max-width: 1000px;
    margin-top: 30px;

    & > div {
        display: inline-block;
        justify-content: center;
        margin: 0 0 1rem;
    }
`;

export default Tiles;
