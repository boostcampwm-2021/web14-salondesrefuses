import React from 'react';
import styled from '@emotion/styled';

import kakaoIcon from '@assets/images/kakao.png';
import googleIcon from '@assets/images/google.png';
import SocialLoginButton from './SocialLoginButton';

const index = () => {
    return (
        <Container>
            <div>
                <div>
                    <BorderedH1>Sign in</BorderedH1>
                    <H1>벽전.</H1>
                </div>
                <div>
                    <SocialLoginButton type="Google" icon={googleIcon} />
                    <SocialLoginButton type="Kakao" icon={kakaoIcon} />
                    <span>sign up</span>
                </div>
            </div>
        </Container>
    );
};

const Container = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;

    & > div {
        width: 70%;
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        & > div:nth-of-type(2) {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
`;

const H1 = styled.h1`
    display: inline-block;
    margin-right: 5px;
    font: ${(props) => props.theme.font.textEnTitle};
`;

const BorderedH1 = styled(H1)`
    border-bottom: 3px solid ${(props) => props.theme.color.primary};
`;

export default index;
