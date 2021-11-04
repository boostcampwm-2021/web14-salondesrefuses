import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';

import logo from '@assets/images/logo.png';
import AboutUs from './AboutUs';

const Footer = () => {
    return (
        <Container>
            <div>
                <div>
                    <Image src={logo}></Image>
                </div>
                <p>© salon des refuses, 2021</p>
            </div>
            <AboutUs />
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    padding: 0 5%;
    align-items: center;
    height: 300px;
    width: 100vw;
    border-top: 2px solid black;
    background-color: white;
    position: relative;
    bottom: 0;
    font: ${(props) => props.theme.font.textEnBase};
    & > div {
        width: 50%;
        height: 70%;
    }

    & > div:nth-of-type(1) {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        & img {
            width: 100px;
        }
    }
`;

export default Footer;
