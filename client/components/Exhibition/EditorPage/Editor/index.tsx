import React, { useState, useEffect, forwardRef } from 'react';

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
import increaseEditorIcon from '@assets/images/editor-increase.png';
import decreaseEditorIcon from '@assets/images/editor-decrease.png';
import deleteIcon from '@assets/images/editor-trash.png';
import fontStylingIcon from '@assets/images/editor-font-styling.png';
import { useEditorImageState } from '@store/editorImageState';
import { EditorContainer, ToolBar, Button, EditArea } from './style';
import { FontStyle, FontFamily } from 'interfaces';
import useToast from '@hooks/useToast';

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
    const showMouseRightClickToast = useToast({
        onSuccess: '에디터 사용 중에 마우스 오른쪽을 누를 수 없습니다.',
        onFailed: '',
    });

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
                id: elements.length,
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

        return () => {
            setEditorImageState([]);
        };
    }, []);

    const createRectangular = () => {
        const element: EditorElementProp = {
            id: elements.length,
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
    const deleteElement = () => {
        if (!currentElements) return;
        setElements(() => elements.filter((el) => el.id !== Number(currentElements[0]?.id)));
        setCurrentElements([]);
    };
    const onFontStylerButton = () => {
        mirrorCurrentFontStyle();
        setShowFontStyler((prev) => !prev);
    };
    const createText = () => {
        const element: EditorElementProp = {
            id: elements.length,
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
    };
    const setIsDoubleClickedFunc = (check: boolean) => {
        setIsDoubleClicked(check);
    };

    const onClickZIndexButton = (direction: string) => {
        return () => {
            currentElements.forEach((elem) => {
                if (!elem) return;
                const z = elem.style.zIndex;
                if (direction === 'FORWARD') elem.style.zIndex = `${+z + 10}`;
                else elem.style.zIndex = `${+z - 10 < 0 ? 0 : +z - 10}`;
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

    const onContextMenuHandle = (e: React.MouseEvent) => {
        if (e.type === 'contextmenu') {
            e.preventDefault();
            showMouseRightClickToast('success');
        }
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Backspace') {
            deleteElement();
        }
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
                <Button onClick={deleteElement} bg={deleteIcon.src} />
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
            <EditArea
                height={height}
                onContextMenu={onContextMenuHandle}
                ref={editorRef}
                onKeyDown={onKeyDown}
                tabIndex={0}
            >
                {renderElements()}
            </EditArea>
        </EditorContainer>
    );
};

export default forwardRef(Editor);
