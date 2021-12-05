import React, { useState, useEffect, forwardRef, useCallback } from 'react';

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
import { ToastMsg } from '@const/toast-message';

type Props = {
    elements: EditorElementProp[];
    setElements: Function;
    editorRef: React.MutableRefObject<HTMLDivElement | null>;
    editorSize: number;
    saveEditorSize: (flag: boolean) => void;
};

const Editor = ({ elements, setElements, editorRef, editorSize, saveEditorSize }: Props) => {
    const [currentElements, setCurrentElements] = useState<Array<HTMLElement | null>>([]);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showFontStyler, setShowFontStyler] = useState(false);
    const [isDoubleClicked, setIsDoubleClicked] = useState(false);
    const [color, setColor] = useState('#000');
    const [fontStyles, setFontStyles] = useState<FontStyle>({ align: 'LEFT', fontSize: 14, fontFamily: 'Montserrat' });
    const [editorImageState, setEditorImageState] = useEditorImageState();
    const showMouseRightClickToast = useToast({
        onSuccess: '에디터 사용 중에 마우스 오른쪽을 누를 수 없습니다.',
        onFailed: '',
    });
    const [elementCount, setElementCount] = useState({
        any: elements.length,
        img: elements.filter((element) => element.tagName === 'IMAGE').length,
    });
    const maxAnyElementCount = 35;
    const maxImgElementCount = 10;

    const fullAnyElements = useToast({ onSuccess: '', onFailed: ToastMsg.FULL_ANY_ELEMENT });
    const fullImgElements = useToast({ onSuccess: '', onFailed: ToastMsg.FULL_IMG_ELEMENT });

    useEffect(() => {
        currentElements.forEach((elem) => {
            if (!elem) return;
            if (elem.classList.contains('RECTANGULAR')) elem.style.backgroundColor = color;
            if (elem.classList.contains('TEXT')) elem.style.color = color;
        });
    }, [color]);

    useEffect(() => {
        if (editorImageState.length === 0) return;
        if (elementCount.any + 1 > maxAnyElementCount || elementCount.img + 1 > maxImgElementCount) {
            fullImgElements('failed');
            return;
        }
        setElementCount({ any: ++elementCount.any, img: ++elementCount.img });
        const element: EditorElementProp = {
            id: makeNewId() || 0,
            tagName: EditorElementName.image,
            style: initialImageStyle,
            image: editorImageState[editorImageState.length - 1],
        };
        setElements([...elements, element]);
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
            if (!(e.target as HTMLDivElement).classList.contains('editorElement')) keyToCurrentElements([]);
        });
        return () => {
            setEditorImageState([]);
        };
    }, []);

    const makeNewId = () => elements.reduce((acc, elem) => (elem.id > acc ? elem.id : acc), -1) + 1;
    const createRectangular = () => {
        if (elementCount.any + 1 > maxAnyElementCount) return fullAnyElements('failed');
        setElementCount({ ...elementCount, any: ++elementCount.any });
        const element: EditorElementProp = {
            id: makeNewId() || 0,
            tagName: EditorElementName.rectangular,
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
        currentElements[0]?.classList.contains('IMAGE')
            ? setElementCount({ any: --elementCount.any, img: --elementCount.img })
            : setElementCount({ any: --elementCount.any, img: elementCount.img });
    };

    const onFontStylerButton = () => {
        mirrorCurrentFontStyle();
        setShowFontStyler((prev) => !prev);
    };

    const createText = () => {
        if (elementCount.any + 1 > maxAnyElementCount) return fullAnyElements('failed');

        setElementCount({ ...elementCount, any: ++elementCount.any });
        const element: EditorElementProp = {
            id: makeNewId() || 0,
            tagName: EditorElementName.text,
            style: initialTextStyle,
        };
        setElements([...elements, element]);
    };
    const changeFontStyles = useCallback((newFontStyle: FontStyle) => {
        setFontStyles(newFontStyle);
    }, []);

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
                if (direction === 'FORWARD') elem.style.zIndex = `${+z + 10}`;
                else elem.style.zIndex = `${+z - 10 < 0 ? 0 : +z - 10}`;
            });
        };
    };

    const renderElements = () => {
        return elements.map((element) => {
            if (element.tagName)
                return (
                    <EditorElement
                        key={element.id}
                        idx={element.id}
                        style={element.style}
                        currentElements={currentElements}
                        keyToCurrentElements={keyToCurrentElements}
                        tagName={element.tagName}
                        image={element.image}
                        imageSrc={element.imageSrc}
                        text={element.innerHTML}
                        artworkId={element.artworkId}
                        isDoubleClicked={isDoubleClicked}
                        setIsDoubleClickedFunc={setIsDoubleClickedFunc}
                    ></EditorElement>
                );
        });
    };

    const onContextMenuHandle = useCallback((e: React.MouseEvent) => {
        if (e.type === 'contextmenu') {
            e.preventDefault();
            showMouseRightClickToast('success');
        }
    }, []);

    const onKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Backspace') {
            deleteElement();
        }
    }, []);

    return (
        <EditorContainer height={editorSize}>
            <ToolBar>
                <Button onClick={createRectangular} bg={rectButtonIcon.src} />
                <Button onClick={onClickColorButton} bg={colorButtonIcon.src} />
                <Button onClick={createText} bg={textButtonIcon.src} />
                <Button onClick={onClickZIndexButton('FORWARD')} bg={forwardButtonIcon.src} />
                <Button onClick={onClickZIndexButton('BACKWARD')} bg={backwardButtonIcon.src} />
                <Button onClick={() => saveEditorSize(true)} bg={increaseEditorIcon.src} />
                <Button onClick={() => saveEditorSize(false)} bg={decreaseEditorIcon.src} />
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
                height={editorSize}
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
