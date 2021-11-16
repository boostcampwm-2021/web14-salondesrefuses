import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

import { BlackButton, Description, Title } from '../style';
import Editor from './Editor';
import ImageSlider from './ImageSlider';
import { EditorElementProp } from '@components/Exhibition/EditorPage/Editor/types';

interface EditorProp {
    backButtonHandler: () => void;
}

const index = ({ backButtonHandler }: EditorProp) => {
    const [elements, setElements] = useState<EditorElementProp[]>([]);
    const editorRef = useRef<HTMLDivElement | null>(null);

    const setElementList = (elementList: EditorElementProp[]) => {
        setElements(elementList);
    }

    const saveButtonHandler = () => {
        // [ ...editorRef.current?.childNodes! ]
        //     .forEach((el: ChildNode) => console.log((el as HTMLElement).style));
    };

    return (
        <>
            <Title>
                <h1>Edit Exhibition</h1>
                <Description>나만의 전시회를 만들어 보세요!</Description>
            </Title>
            <Container>
                <ImageSlider />
                <Editor elements={elements} setElements={setElementList} ref={editorRef}/>
                <ButtonContainer>
                    <EditorButton onClick={backButtonHandler}>Back</EditorButton>
                    <EditorButton onClick={saveButtonHandler}>Save</EditorButton>
                </ButtonContainer>
            </Container>
        </>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;

    width: 1180px;
    margin: 50px 0;
    user-select: none;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    position: absolute;
    width: 115px;
    height: 50px;
    top: -90px;
    right: 0;
    border: none;
`;

const EditorButton = styled(BlackButton)`
    font: ${(props) => props.theme.font.textBase};
`;

export default index;
