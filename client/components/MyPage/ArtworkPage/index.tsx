import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Web3 from 'web3';

import Tiles from '@components/Artwork/Tiles';

const ArtworkPage = () => {
    return (
        <Container>
            <Tiles />
        </Container>
    );
};

const Container = styled.div``;

export default ArtworkPage;
