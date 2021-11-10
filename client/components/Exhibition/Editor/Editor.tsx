import styled from '@emotion/styled';
import React, { useState, useRef, useEffect } from 'react';

import ColorPicker from './ColorPicker';
import EditorElement from './EditorElement';
import {
    initialRectStyle,
    initialTextStyle,
} from '@const/editor-initial-state';
import { EditorElementName, EditorElementProp } from './types';

const Editor = () => {
    const [elements, setElements] = useState<EditorElementProp[]>([]);
    const [currentElements, setCurrentElements] = useState<
        Array<HTMLElement | null>
    >([]);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [color, setColor] = useState('#000');

    useEffect(() => {
        currentElements.forEach((elem) => {
            if (!elem) return;
            if (elem.tagName === 'DIV') elem.style.backgroundColor = color;
            if (elem.tagName === 'INPUT') elem.style.color = color;
        });
    }, [color]);

    const createRectangular = () => {
        const element: EditorElementProp = {
            type: EditorElementName.rectangular,
            style: initialRectStyle,
        };
        setElements([...elements, element]);
    };

    const onClickColorButton = () => {
        setShowColorPicker(!showColorPicker);
    };

    const createText = () => {
        const element: EditorElementProp = {
            type: EditorElementName.text,
            style: initialTextStyle,
        };
        setElements([...elements, element]);
    };

    const keyToCurrentElements = (keyArr: Array<HTMLElement | null>) => {
        setCurrentElements(keyArr);
    };

    const onClickZIndexButton = (direction: string) => {
        return () => {
            currentElements.forEach((elem) => {
                if (!elem) return;
                const z = elem.style.zIndex;
                if (direction === 'FORWARD') elem.style.zIndex = `${+z + 100}`;
                else elem.style.zIndex = `${+z - 100}`;
            });
        };
    };

    const renderElements = () => {
        return elements.map((element, idx) => (
            <EditorElement
                key={idx}
                idx={idx}
                style={element.style}
                currentElements={currentElements}
                keyToCurrentElements={keyToCurrentElements}
                type={element.type}
            ></EditorElement>
        ));
    };

    return (
        <EditorContainer>
            <ToolBar>
                <Button onClick={createRectangular}>Rectangular</Button>
                <Button onClick={onClickColorButton}>Color</Button>
                <Button onClick={createText}>Text</Button>
                <Button onClick={onClickZIndexButton('FORWARD')}>
                    Forward
                </Button>
                <Button onClick={onClickZIndexButton('BACKWARD')}>
                    Backward
                </Button>
                {showColorPicker && (
                    <ColorPicker
                        color={color}
                        handleColor={(color) => {
                            setColor(color);
                        }}
                    />
                )}
            </ToolBar>
            <EditArea>{renderElements()}</EditArea>
        </EditorContainer>
    );
};

const EditorContainer = styled.div`
    width: 100%;
    height: 100vh;
    border: 1px solid ${(props) => props.theme.color.gray1};
`;

const ToolBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid ${(props) => props.theme.color.gray1};
    position: relative;
    padding-left: 30px;
`;
const Button = styled.button`
    height: 100%;
    background: none;
    border: none;

    &:hover {
        border-bottom: 2px solid black;
    }
`;
const EditArea = styled.div`
    position: relative;
    overflow: hidden;
    height: calc(100% - 50px);
`;
export default Editor;
