import React, { useState } from 'react';
import styled from '@emotion/styled';

import { Artist } from 'interfaces';
import { SpaceBetween } from '@styles/common';

const AboutArtist = ({ artist }: { artist: Artist }) => {
    const [expand, setExpand] = useState(false);
    const { name, description } = artist;

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
                    <div>
                        <span>작가 이름:</span>
                        <span>{name}</span>
                    </div>
                    <div>
                        <span>작가 소개:</span>
                        <Description>{description}</Description>
                    </div>
                </Expanded>
            )}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
    display: flex;
    flex-direction: column;
    width: 90%;
    margin-bottom: 10px;

    & span {
        font: ${(props) => props.theme.font.textSm};
        margin-right: 10px;
    }
    
    & > div {
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
    }
`;

export const Description = styled.div`
    max-width: 460px;
    font: ${(props) => props.theme.font.textSm};
`;

export default AboutArtist;
