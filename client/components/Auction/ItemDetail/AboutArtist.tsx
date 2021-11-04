import React, { useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';

import { SpaceBetween } from '@styles/common';

const AboutArtist = () => {
    const [expand, setExpand] = useState(false);

    const onClickExpandButon = () => {
        setExpand((expand) => !expand);
    };

    return (
        <Container>
            <Title>
                <h1>작가 설명</h1>
                <button onClick={onClickExpandButon}>
                    <Img
                        src="/icons/arrow-down.png"
                        alt="expand"
                        expand={expand}
                    />
                </button>
            </Title>
            {expand && (
                <Expanded>
                    <span>
                        작가설명입니다.작가설명입니다.작가설명입니다.작가설명입니다.
                    </span>
                </Expanded>
            )}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justfiy-content: flex-start;
    align-items: center;

    & img {
        width: 32px;
        height: 32px;
    }
`;

const Title = styled.div`
    width: 90%;
    ${SpaceBetween}

    & > h1 {
        font: ${(props) => props.theme.font.textEnBase};
    }

    & > button {
        background: none;
        border: none;
    }
`;

const Img = styled.img<{ expand: boolean }>`
    ${(props) => (props.expand ? 'transform: rotate(180deg);' : '')}
    transition: transform 0.5s ease;
`;

const Expanded = styled.div`
    width: 90%;
    margin: 10px 0;

    & > span {
        font: ${(props) => props.theme.font.textSm};
    }
`;

export default AboutArtist;
