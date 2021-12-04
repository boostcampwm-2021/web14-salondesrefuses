import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

import { signIn } from '../../service/networking';

const LoginCallbackPage = () => {
    const router = useRouter();

    useEffect(() => {
        let user = null;
        const code: string | null = new URL(window.location.href).searchParams.get('code');

        (async () => {
            if (!code) return;

            router.asPath.includes('google')
                ? (user = await signIn(code, 'google'))
                : (user = await signIn(code, 'kakao'));

            user.data ? router.push('/') : router.push('/login');
        })();
    }, []);

    return (
        <Container>
            <LoadingSpinner>
                <Notice>Loading...</Notice>
                <ClipLoader size="100px" color="#000"></ClipLoader>
            </LoadingSpinner>
        </Container>
    );
};

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoadingSpinner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
    margin: auto 0;
`;

const Notice = styled.div`
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 50px;
    color: #000;
`;

export default LoginCallbackPage;
