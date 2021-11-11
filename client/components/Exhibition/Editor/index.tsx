import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import { Description } from '../style';
import Editor from './Editor';
import { NextButton as BackButton } from '../style';
import ImageSlider from './ImageSlider';
import { Artwork } from 'interfaces';
import { getAllArtworks } from '@utils/networking';

interface EditorProp {
    backbuttonHandler: () => void;
}

const index = ({ backbuttonHandler }: EditorProp) => {
    return (
        <>
            <Title>
                <h1>Hold Exhibition</h1>
                <Description>나만의 전시회를 만들어 보세요!</Description>
            </Title>
            <Container>
                <ImageSlider selectedImages={[]} />
                <Editor />
                <BackButton onClick={backbuttonHandler}>Back</BackButton>
            </Container>
        </>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;

    width: 920px;
    margin: 30px 0;
    user-select: none;
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;

    width: 920px;
    margin: 0 auto;
    margin-top: 40px;

    & > h1 {
        font: ${(props) => props.theme.font.textEnLg};
        color: ${(props) => props.theme.color.placeholder};
        margin-bottom: 8px;
        margin: 0;
    }
`;

export default index;
