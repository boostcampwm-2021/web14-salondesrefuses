import React, { useRef } from 'react';
import styled from '@emotion/styled';

import { BlackButton, Description, Title } from '../style';
import Editor from './Editor';
import ImageSlider from './ImageSlider';
import { EditorElementProp } from '@components/Exhibition/EditorPage/Editor/types';

interface EditorProp {
    elements: EditorElementProp[];
    setElementList: (elementList: EditorElementProp[]) => void;
    backButtonHandler: () => void;
    holdExhibition: (content: string, size: string, artworkIds: string) => void;
}
interface ExhibitionElement {
    tagName: string;
    innerText: string;
    imageSrc?: string | null;
    artworkId?: string;
    style: {
        [key: string]: string;
    };
}

const index = ({ elements, setElementList, backButtonHandler, holdExhibition }: EditorProp) => {
    const editorRef = useRef<HTMLDivElement | null>(null);

    const saveButtonHandler = async () => {
        const exhibitionElements: Array<ExhibitionElement> = [];
        if (!editorRef.current) return;
        const editorSize = window.getComputedStyle(editorRef.current!).height;
        const artworkIds: Array<string | undefined> = [];

        [...editorRef.current.childNodes].forEach((el: ChildNode) => {
            const element = el as HTMLElement;
            const { innerText } = element;
            const tagName = element.classList[1];
            const { width, height, color, transform, backgroundColor } = element.style;
            const { top, left, zIndex, backgroundImage } = window.getComputedStyle(element);
            let imageSrc = null;
            if (element.classList.contains('IMAGE')) {
                imageSrc = backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
            }
            const artworkId = element.dataset.artwork;
            artworkId && artworkIds.push(artworkId);

            exhibitionElements.push({
                tagName,
                innerText,
                imageSrc,
                artworkId,
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

        holdExhibition(JSON.stringify(exhibitionElements), editorSize, JSON.stringify(artworkIds));
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
