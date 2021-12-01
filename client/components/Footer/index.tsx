import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';

import logo from '@assets/images/logo.webp';
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
    padding: 0 10%;
    align-items: center;
    height: 270px;
    width: 100%;
    border-top: 1px solid ${(props) => props.theme.color.gray1};
    background-color: ${(props) => props.theme.color.background};
    position: relative;
    bottom: 0;
    font: ${(props) => props.theme.font.textSm};

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
