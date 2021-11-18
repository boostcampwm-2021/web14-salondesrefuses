import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

import { BlackButton, Description, Title } from '../style';
import Editor from './Editor';
import ImageSlider from './ImageSlider';
import { EditorElementProp } from '@components/Exhibition/EditorPage/Editor/types';

interface EditorProp {
    backButtonHandler: () => void;
    holdExhibition: (content: string, size: string) => void;
}
interface ExhibitionElement {
    tagName: string;
    innerText: string;
    imageSrc: string | null;
    style: {
        [key: string]: string;
    };
}

const index = ({ backButtonHandler, holdExhibition }: EditorProp) => {
    const [elements, setElements] = useState<EditorElementProp[]>([]);
    const editorRef = useRef<HTMLDivElement | null>(null);

    const setElementList = (elementList: EditorElementProp[]) => {
        setElements(elementList);
    };

    const saveButtonHandler = async () => {
        const exhibitionElements: Array<ExhibitionElement> = [];
        if (!editorRef.current) return;
        const editorSize = editorRef.current.style.height;

        [...editorRef.current.childNodes].forEach((el: ChildNode) => {
            const element = el as HTMLElement;

            const { tagName, innerText } = element;
            const { width, height, color, transform, backgroundColor } = element.style;
            const { top, left, zIndex, backgroundImage } = window.getComputedStyle(element);
            let imageSrc = null;

            if (element.classList.contains('IMAGE')) {
                imageSrc = backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
            }

            exhibitionElements.push({
                tagName,
                innerText,
                imageSrc,
                style: {
                    top,
                    left,
                    width,
                    height,
                    color,
                    backgroundColor,
                    transform,
                    zIndex,
                },
            });
        });

        holdExhibition(JSON.stringify(exhibitionElements), editorSize);
    };

    return (
        <>
            <Title>
                <h1>Edit Exhibition</h1>
                <Description>나만의 전시회를 만들어 보세요!</Description>
            </Title>
            <Container>
                <ImageSlider />
                <Editor elements={elements} setElements={setElementList} ref={editorRef} />
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
