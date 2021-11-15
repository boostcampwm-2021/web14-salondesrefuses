import React, { useReducer } from 'react';
import styled from '@emotion/styled';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import sideImage from '@assets/images/login-side-test.png';
import logo from '@assets/images/logo.png';
import Login from '@components/Login';
import LoginResultModal from '@components/Login/LoginResultModal';

type ModalState =
    | { view: false; message: '' }
    | { view: true; message: '로그인에 성공했습니다.' }
    | { view: true; message: '로그인에 실패했습니다.' };

const modalReducer = (
    state: ModalState,
    action: { type: string },
): ModalState => {
    switch (action.type) {
        case 'SUCCESS':
            return { view: true, message: '로그인에 성공했습니다.' };
        case 'FAIL':
            return { view: true, message: '로그인에 실패했습니다.' };
        default:
            return { view: false, message: '' };
    }
};

const LoginPage = () => {
    const [modal, dispatch] = useReducer(modalReducer, {
        view: false,
        message: '',
    });

    const kakaoResponseFailed = (err: Error) => {};

    return (
        <Container>
            <Head>
                <title>벽전 - Salon des Refusés</title>
                <meta name="description" content="벽전 로그인 페이지" />
            </Head>
            <Body>
                <Logo>
                    <Link href="/">
                        <img src={logo.src} alt="logo" />
                    </Link>
                </Logo>
                <Image src={sideImage} alt="side image" />
                <Login />
            </Body>
            {modal.view && (
                <LoginResultModal
                    message={'로그인에 성공했습니다.'}
                    close={dispatch}
                />
            )}
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
    cursor: pointer;

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
