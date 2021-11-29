import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { getAllArtworks } from 'service/networking';
import ImageTile from '../ImageTile';
import { Artwork } from 'interfaces';
import createResource from '@utils/createResource';

const resource = createResource(getAllArtworks());

const Tiles = ({ align = 'center' }: { align: string }) => {
    const artworks: Artwork[] = resource.read().data;

    return (
        <Container align={align}>
            <Grid>
                {artworks.map((item, idx: number) => (
                    <ImageTile key={idx} src={item.originalImage} />
                ))}
            </Grid>
        </Container>
    );
};

const Container = styled.div<{ align: string }>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: ${(props) => props.align};
    overflow: visible;
    margin-bottom: 50px;
    min-width: 1000px;
`;

const Grid = styled.div`
    column-count: 4;
    width: 100%;
    max-width: 1000px;
    margin-top: 30px;
    text-align: center;

    & > div {
        display: inline-block;
        justify-content: center;
        margin: 0 0 1rem;
    }
`;

export default Tiles;
