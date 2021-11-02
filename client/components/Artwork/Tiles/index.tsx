import React, { useEffect } from 'react';
import styled from '@emotion/styled';

import ImageTile from './ImageTile';

const Tiles = () => {
    useEffect(() => {}, []);

    return (
        <Container>
            <Grid></Grid>
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
