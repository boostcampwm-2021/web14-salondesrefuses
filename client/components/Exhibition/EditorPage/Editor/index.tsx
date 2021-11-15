import React, { useState, useEffect, useRef } from 'react';

import ColorPicker from '../ColorPicker';
import EditorElement from '../EditorElement';
import {
    initialImageStyle,
    initialRectStyle,
    initialTextStyle,
} from '@const/editor-initial-state';
import { EditorElementName, EditorElementProp } from './types';
import rectButtonIcon from '@assets/images/editor-rectangular.png';
import colorButtonIcon from '@assets/images/editor-color.png';
import textButtonIcon from '@assets/images/editor-text.png';
import forwardButtonIcon from '@assets/images/editor-forward.png';
import backwardButtonIcon from '@assets/images/editor-backward.png';
import { useEditorImageState } from '@store/editorImageState';
import { EditorContainer, ToolBar, Button, EditArea } from './style';

const Editor = () => {
    const [elements, setElements] = useState<EditorElementProp[]>([]);
    const [currentElements, setCurrentElements] = useState<
        Array<HTMLElement | null>
    >([]);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [color, setColor] = useState('#000');
    const editorRef = useRef<HTMLDivElement | null>(null);

    const [editorImageState, setEditorImageState] = useEditorImageState();

    useEffect(() => {
        currentElements.forEach((elem) => {
            if (!elem) return;
            if (elem.tagName === 'DIV') elem.style.backgroundColor = color;
            if (elem.tagName === 'INPUT') elem.style.color = color;
        });
    }, [color]);

    useEffect(() => {
        if (editorImageState.length === 0) return;
        setElements([
            ...elements,
            {
                type: 'IMAGE',
                style: initialImageStyle,
                image: editorImageState[editorImageState.length - 1],
            },
        ]);
    }, [editorImageState]);

    useEffect(() => {
        if (!editorRef.current) return;
        editorRef.current.addEventListener('click', (e) => {
            if (
                !(e.target as HTMLDivElement).classList.contains(
                    'editorElement',
                )
            ) {
                keyToCurrentElements([]);
            }
        });
    }, []);

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
                image={element.image}
            ></EditorElement>
        ));
    };

    return (
        <EditorContainer>
            <ToolBar>
                <Button onClick={createRectangular} bg={rectButtonIcon.src} />
                <Button onClick={onClickColorButton} bg={colorButtonIcon.src} />
                <Button onClick={createText} bg={textButtonIcon.src} />
                <Button
                    onClick={onClickZIndexButton('FORWARD')}
                    bg={forwardButtonIcon.src}
                />
                <Button
                    onClick={onClickZIndexButton('BACKWARD')}
                    bg={backwardButtonIcon.src}
                />
                {showColorPicker && (
                    <ColorPicker
                        color={color}
                        handleColor={(color) => {
                            setColor(color);
                        }}
                    />
                )}
            </ToolBar>
            <EditArea ref={editorRef}>{renderElements()}</EditArea>
        </EditorContainer>
    );
};

export default Editor;
