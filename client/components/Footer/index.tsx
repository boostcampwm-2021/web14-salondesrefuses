import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';

import logo from '@assets/images/tmpLogo.png';

const Footer = () => {
    return (
        <Container>
            <div>
                <Image src={logo} width="100" height="60"></Image>
            </div>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    padding: 5% 0;
    align-items: center;
    height: 300px;
    width: 100vw;
    border-top: 2px solid black;
    background-color: white;
    position: relative;
    bottom: 0px;
`;

export default Footer;
