import React from 'react';
import styled from '@emotion/styled';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import sideImage from '@assets/images/login-side-test.png';
import logo from '@assets/images/logo.png';
import Login from '@components/Login';

const LoginPage = () => {
    return (
        <Container>
            <Head>
                <title>벽전 - Salon des Refusés</title>
                <meta name="description" content="벽전 로그인 페이지" />
            </Head>
            <Body>
                <Logo>
                    <Link href="/">
                        <Image src={logo} />
                    </Link>
                </Logo>
                <Image src={sideImage} alt="side image" />
                <Login></Login>
            </Body>
        </Container>
    );
};

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.color.background};
`;

const Logo = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 500;

    & img {
        height: 40px;
        border-radius: 0;
    }
`;

const Body = styled.div`
    position: relative;
    height: 80vh;
    width: 70vw;
    max-width: 1000px;
    background-color: white;
    border-radius: 15px;
    box-shadow: -2px 8px 24px 1px rgba(149, 157, 165, 0.2);
    display: grid;
    grid-template-columns: 5fr 6fr;

    & img {
        border-radius: 15px 0 0 15px;
    }
`;

export default LoginPage;
