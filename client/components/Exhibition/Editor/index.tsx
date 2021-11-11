import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import { Description, Title } from '../style';
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
                <h1>Edit Exhibition</h1>
                <Description>나만의 전시회를 만들어 보세요!</Description>
            </Title>
            <Container>
                <ImageSlider />
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

    width: 1120px;
    margin: 50px 0;
    user-select: none;
`;

export default index;
