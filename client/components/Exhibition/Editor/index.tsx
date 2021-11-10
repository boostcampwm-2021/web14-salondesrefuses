import React from 'react';
import styled from '@emotion/styled';

import { Description } from '../style';
import Editor from './Editor';
import { NextButton as BackButton } from '../style';

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
                <Editor />
                <BackButton onClick={backbuttonHandler}>Back</BackButton>
            </Container>
        </>
    );
};

const Container = styled.div`
    display: flex;
    position: relative;

    width: 920px;
    margin: 50px 0;
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
