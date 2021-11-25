import React from 'react';
import styled from '@emotion/styled';

import logo from '@assets/images/logo.png';
import { Center } from '@styles/common';

const Fallback = () => {
    return (
        <Container>
            <img src={logo.src} alt={'loading'} />
            <h1>Now Loading...</h1>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 400px;
    display: flex;
    ${Center};
    flex-direction: column;
    filter: blur(3px);

    & > h1 {
        margin-top: 30px;
        font: ${(props) => props.theme.font.textEnLg};
        font-weight: 400;
    }

    & > img {
        width: 100px;
    }
`;

export default Fallback;
