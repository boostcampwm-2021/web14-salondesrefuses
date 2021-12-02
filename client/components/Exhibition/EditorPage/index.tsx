import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';

import { BlackButton, Description, Title } from '../style';
import Editor from './Editor';
import ImageSlider from './ImageSlider';
import { EditorElementProp, EditorElementType } from '@components/Exhibition/EditorPage/Editor/types';
import { useRouter } from 'next/router';
import { FontFamily } from 'interfaces';

interface EditorProp {
    handleBackButton: () => void;
    holdExhibition: (content: string, size: string, artworkIds: string, isEdit: string | undefined) => void;
    elements: EditorElementProp[];
    setElementList: (elementList: EditorElementProp[]) => void;
    isEdit: boolean;
    saveEditorSize: (flag: boolean) => void;
    editorSize: number;
}
interface ExhibitionElement {
    tagName: string;
    innerHTML?: string | null;
    imageSrc?: string | null;
    artworkId?: string;
    style: {
        [key: string]: string;
    };
}

const getExhibitionElementsDetail = (el: ChildNode) => {
    const element = el as HTMLElement;
    const tagName = element.classList[1];
    const { width, height, color, transform, backgroundColor } = element.style;
    const { top, left, zIndex, backgroundImage, fontFamily, fontSize, textAlign } = window.getComputedStyle(element);
    let imageSrc = null;
    if (element.classList.contains('IMAGE')) {
        imageSrc = backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
    }
    const artworkId = element.dataset.artwork;

    const innerHTML = (tagName === 'TEXT' && element.children[0].innerHTML) || null;

    return {
        width,
        height,
        color,
        transform,
        backgroundColor,
        top,
        left,
        zIndex,
        fontFamily,
        fontSize,
        textAlign,
        tagName,
        imageSrc,
        artworkId,
        innerHTML,
    };
};

const index = ({
    handleBackButton,
    holdExhibition,
    elements,
    setElementList,
    isEdit,
    saveEditorSize,
    editorSize,
}: EditorProp) => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const exhibitionId = (useRouter().query.exhibitionId as string) || undefined;

    const saveButtonHandler = async () => {
        const exhibitionElements: Array<ExhibitionElement> = [];
        if (!editorRef.current) return;
        const artworkIds: Array<string | undefined> = [];

        [...editorRef.current.childNodes].forEach((el: ChildNode) => {
            const {
                width,
                height,
                color,
                transform,
                backgroundColor,
                top,
                left,
                zIndex,
                fontFamily,
                fontSize,
                textAlign,
                tagName,
                imageSrc,
                artworkId,
                innerHTML,
            } = getExhibitionElementsDetail(el);
            artworkId && artworkIds.push(artworkId);
            exhibitionElements.push({
                tagName,
                innerHTML,
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
                    fontFamily,
                    fontSize,
                    textAlign,
                },
            });
        });

        holdExhibition(JSON.stringify(exhibitionElements), `${editorSize}px`, JSON.stringify(artworkIds), exhibitionId);
    };
    const backButtonHandler = () => {
        if (!editorRef.current) return;
        // setEditorSize(parseInt(window.getComputedStyle(editorRef.current!).height));
        const artworkIds: Array<string | undefined> = [];
        const tmpElementStates: Array<EditorElementProp> = [];

        [...editorRef.current.childNodes].forEach((el: ChildNode) => {
            const {
                width,
                height,
                color,
                transform,
                backgroundColor,
                top,
                left,
                zIndex,
                fontFamily,
                fontSize,
                textAlign,
                tagName,
                imageSrc,
                artworkId,
                innerHTML,
            } = getExhibitionElementsDetail(el);
            artworkId && artworkIds.push(artworkId);

            tmpElementStates.push({
                id: parseInt(artworkId || ''),
                tagName: tagName as EditorElementType,
                innerHTML: innerHTML || undefined,
                imageSrc: imageSrc || undefined,
                style: {
                    position: 'absolute' as 'absolute',
                    top: parseInt(top),
                    left: parseInt(left),
                    width,
                    height,
                    color,
                    backgroundColor,
                    transform,
                    zIndex: parseInt(zIndex),
                    fontFamily: fontFamily as FontFamily | undefined,
                    fontSize: parseInt(fontSize),
                    textAlign: textAlign as 'LEFT' | 'CENTER' | 'RIGHT',
                },
            });
        });
        setElementList(tmpElementStates);
        handleBackButton();
    };

    return (
        <>
            <Title>
                <h1>{isEdit ? 'Edit Exhibition' : 'Hold Exhibition'}</h1>
                <Description>나만의 전시회를 만들어 보세요!</Description>
            </Title>
            <Container>
                <ImageSlider />
                <Editor
                    elements={elements}
                    setElements={setElementList}
                    editorRef={editorRef}
                    editorSize={editorSize}
                    saveEditorSize={saveEditorSize}
                />
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
