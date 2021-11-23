import React, { useState, useEffect, useRef, forwardRef } from 'react';

import ColorPicker from '../ColorPicker';
import EditorElement from '../EditorElement';
import FontStyler from '../FontStyler';
import { initialImageStyle, initialRectStyle, initialTextStyle } from '@const/editor-initial-state';
import { EditorElementName, EditorElementProp } from './types';
import rectButtonIcon from '@assets/images/editor-rectangular.png';
import colorButtonIcon from '@assets/images/editor-color.png';
import textButtonIcon from '@assets/images/editor-text.png';
import forwardButtonIcon from '@assets/images/editor-forward.png';
import backwardButtonIcon from '@assets/images/editor-backward.png';
import increaseEditorIcon from '@assets/images/increase-editor.png';
import decreaseEditorIcon from '@assets/images/decrease-editor.png';
import fontStylingIcon from '@assets/images/font-styling.png';
import { useEditorImageState } from '@store/editorImageState';
import { EditorContainer, ToolBar, Button, EditArea } from './style';
import { FontStyle, FontFamily } from 'interfaces';

type Props = {
    elements: EditorElementProp[];
    setElements: Function;
};

const Editor = ({ elements, setElements }: Props, editorRef: any) => {
    const [currentElements, setCurrentElements] = useState<Array<HTMLElement | null>>([]);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showFontStyler, setShowFontStyler] = useState(false);
    const [isDoubleClicked, setIsDoubleClicked] = useState(false);
    const [color, setColor] = useState('#000');
    const [fontStyles, setFontStyles] = useState<FontStyle>({ align: 'LEFT', fontSize: 14, fontFamily: 'Montserrat' });

    const [editorImageState, setEditorImageState] = useEditorImageState();
    const [height, setHeight] = useState<number>(1000);
    const initialHeightValue = 1000;

    useEffect(() => {
        currentElements.forEach((elem) => {
            if (!elem) return;
            if (elem.classList.contains('RECTANGULAR')) elem.style.backgroundColor = color;
            if (elem.classList.contains('TEXT')) elem.style.color = color;
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
        currentElements.forEach((elem) => {
            if (!elem) return;
            if (elem.classList.contains('TEXT')) {
                elem.style.setProperty('font-family', fontStyles.fontFamily);
                elem.style.setProperty('font-size', fontStyles.fontSize + 'px');
                elem.style.setProperty('text-align', fontStyles.align);
            }
        });
    }, [JSON.stringify(fontStyles)]);

    useEffect(() => {
        if (!editorRef.current) return;
        editorRef.current.addEventListener('click', (e: any) => {
            if (!(e.target as HTMLDivElement).classList.contains('editorElement')) {
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
        setShowColorPicker((prev) => !prev);
    };
    const mirrorCurrentFontStyle = () => {
        currentElements.forEach((elem) => {
            if (!elem) return;
            if (elem.classList.contains('TEXT')) {
                setFontStyles({
                    fontSize: parseInt(elem.style.fontSize) || 14,
                    fontFamily: (elem.style.fontFamily as FontFamily) || 'Montserrat',
                    align: (elem.style.textAlign as 'LEFT' | 'CENTER' | 'RIGHT') || 'LEFT',
                });
            }
        });
    };
    const onFontStylerButton = () => {
        mirrorCurrentFontStyle();
        setShowFontStyler((prev) => !prev);
    };
    const createText = () => {
        const element: EditorElementProp = {
            type: EditorElementName.text,
            style: initialTextStyle,
        };
        setElements([...elements, element]);
    };
    const changeFontStyles = (newFontStyle: FontStyle) => {
        setFontStyles(newFontStyle);
    };
    const keyToCurrentElements = (keyArr: Array<HTMLElement | null>) => {
        setCurrentElements(keyArr);
        setIsDoubleClicked(false);
    };
    const setIsDoubleClickedFunc = (check: boolean) => {
        setIsDoubleClicked(check);
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

    const onClickIncreaseEditorButton = () => {
        setHeight((prev) => prev + 300);
    };

    const onClickDecreaseEditorButton = () => {
        if (height <= initialHeightValue) {
            return;
        }
        setHeight((prev) => prev - 300);
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
                isDoubleClicked={isDoubleClicked}
                setIsDoubleClickedFunc={setIsDoubleClickedFunc}
            ></EditorElement>
        ));
    };

    return (
        <EditorContainer height={height}>
            <ToolBar>
                <Button onClick={createRectangular} bg={rectButtonIcon.src} />
                <Button onClick={onClickColorButton} bg={colorButtonIcon.src} />
                <Button onClick={createText} bg={textButtonIcon.src} />
                <Button onClick={onClickZIndexButton('FORWARD')} bg={forwardButtonIcon.src} />
                <Button onClick={onClickZIndexButton('BACKWARD')} bg={backwardButtonIcon.src} />
                <Button onClick={() => onClickIncreaseEditorButton()} bg={increaseEditorIcon.src} />
                <Button onClick={() => onClickDecreaseEditorButton()} bg={decreaseEditorIcon.src} />
                <Button onClick={onFontStylerButton} bg={fontStylingIcon.src} />
                {showColorPicker && (
                    <ColorPicker
                        color={color}
                        handleColor={(color) => {
                            setColor(color);
                        }}
                    />
                )}
                {showFontStyler && <FontStyler fontStyle={fontStyles} changeFontStyle={changeFontStyles} />}
            </ToolBar>
            <EditArea height={height} ref={editorRef}>
                {renderElements()}
            </EditArea>
        </EditorContainer>
    );
};

export default forwardRef(Editor);
