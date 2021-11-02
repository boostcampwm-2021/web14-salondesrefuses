import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';

import githubLogo from '@assets/images/ic-github.png';

const AboutUs = () => {
    const onClickGithub = () => {
        window.open(
            'https://github.com/boostcampwm-2021/web14-salondesrefuses',
            '_blank',
        );
    };

    return (
        <Container>
            <H3>About Us</H3>
            <H3>벽전</H3>
            <p>
                1960년, 당대 작가들의 등용문인 대한민국미술전람회(국전)가 열리던
                덕수궁 옆 돌담길에 초청받지 못한 그림이 걸리기 시작했다.
            </p>
            <p>
                국전의 보수성에 대한 문제의식으로 열린 '벽전'은 미술계의 파란을
                일으킨 작은 혁명이었다.
            </p>
            <div style={{ textAlign: 'right' }}>
                Team. 북한산 족두리봉의 정기를 받아.
                <Image src={githubLogo} onClick={onClickGithub} />
            </div>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & img {
        filter: invert(100);
        width: 22px;
        height: 22px;
        cursor: pointer;
    }

    & > div {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;
    }
`;

const H3 = styled.h3`
    font-weight: 300;
`;

export default AboutUs;
