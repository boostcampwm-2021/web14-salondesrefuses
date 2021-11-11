import React from 'react';
import styled from '@emotion/styled';

import { Description, Title } from '../style';
import Editor from './Editor';
import { NextButton as BackButton } from '../style';

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
                <Editor />
                <BackButton onClick={backbuttonHandler}>Back</BackButton>
            </Container>
        </>
    );
};

const Container = styled.div`
    display: flex;
    position: relative;

    width: 1120px;
    margin: 50px 0;
    user-select: none;
`;

export default index;
