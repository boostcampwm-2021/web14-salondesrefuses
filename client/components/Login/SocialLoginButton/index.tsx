import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';

interface SocialLoginButtonProp {
    type: string;
    icon: StaticImageData;
}

const SocialLoginButton = ({ type, icon }: SocialLoginButtonProp) => {
    return (
        <a
            href={
                type === 'Google'
                    ? process.env.GOOGLE_AUTH_URL
                    : process.env.KAKAO_AUTH_URL
            }
            target="_self"
        >
            <Container type={type}>
                <div>
                    <Image src={icon} alt={`${type} 로그인`} />
                </div>
                <Text>
                    <span
                        style={{ color: type === 'Google' ? 'white' : 'black' }}
                    >
                        Sign in with {type}
                    </span>
                </Text>
            </Container>
        </a>
    );
};

const Container = styled.div<{ type: string }>`
    width: 250px;
    height: 50px;
    background: ${(prop) => (prop.type === 'Google' ? '#4285F4' : '#FEE500')};
    margin-bottom: 30px;
    border: 2px solid
        ${(prop) => (prop.type === 'Google' ? '#4285F4' : '#FEE500')};
    display: flex;
    align-items: center;

    & > div:nth-of-type(1) {
        width: 50px;
        height: 46px;
        background: ${(prop) => (prop.type === 'Google' ? 'white' : '#FEE500')};
        display: flex;
        justify-content: center;
        align-items: center;
    }

    & img {
        width: 24px;
        height: 24px;
    }
`;

const Text = styled.div`
    width: 200px;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    padding-left: 20px;
    align-items: center;

    & span {
        font: ${(props) => props.theme.font.textBase};
    }
`;

export default SocialLoginButton;
