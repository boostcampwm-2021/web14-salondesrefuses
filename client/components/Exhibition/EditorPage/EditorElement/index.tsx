import React, { useEffect, useState, useRef, RefObject } from 'react';
import styled from '@emotion/styled';

import { Artwork } from 'interfaces';
import { EditorElementStyle, EditorElementType } from '../Editor/types';
import { onDraggable, getDotStyle, onResize } from './utils';

interface Prop {
    style: EditorElementStyle;
    editable?: boolean;
    tagName: EditorElementType;
    image?: Artwork;
    imageSrc?: string;
    text?: string;
    align?: string;
    idx: number;
    artworkId?: string;
    currentElements: Array<HTMLElement | null>;
    keyToCurrentElements: (arr: Array<HTMLElement | null>) => void;
    isDoubleClicked: boolean;
    setIsDoubleClickedFunc: (check: boolean) => void;
}

const EditorElement = ({
    style,
    tagName,
    image,
    imageSrc,
    text,
    idx,
    artworkId,
    currentElements = [],
    keyToCurrentElements,
    isDoubleClicked,
    setIsDoubleClickedFunc,
}: Prop) => {
    const elementRef = useRef<HTMLElement | null>(null);
    const [currentStyle] = useState(style);
    let isSelected = currentElements.some((element) => element === elementRef.current);
    const element = elementRef?.current;
    const imgWidthThreshold = 800;
    const [elementStyle, setElementStyle] = useState(style);

    const getImgStyle = async () => {
        const tmpImg = new Image();
        tmpImg.src = image?.originalImage || imageSrc!;
        await tmpImg.decode();
        let imageHeight =
            tmpImg.width > imgWidthThreshold ? (tmpImg.height * imgWidthThreshold) / tmpImg.width : tmpImg.height;
        let imageWidth = tmpImg.width > imgWidthThreshold ? imgWidthThreshold : tmpImg.width;
        return {
            width: `${style.width === 'auto' ? imageWidth || currentStyle.width : style.width}px`,
            height: `${style.height === 'auto' ? imageHeight || currentStyle.height : style.height}px`,
        };
    };
    const calculateBaseStyle = () => {
        return {
            top: 0,
            left: 0,
            transform: currentStyle.transform,
            width: `${currentStyle.width}px`,
            height: `${currentStyle.height}px`,
            backgroundColor: currentStyle.backgroundColor,
            position: 'absolute' as 'absolute',
            border: isSelected ? '1px solid #3A8FD6' : '0px',
            zIndex: 100,
            textAlign: currentStyle.textAlign,
            fontFamily: currentStyle.fontFamily,
            fontSize: currentStyle.fontSize,
        };
    };

    const getBorderController = (type: EditorElementType) => {
        return <>{getDots(type)}</>;
    };

    const getDots = (type: EditorElementType) => {
        return type === 'IMAGE' ? (
            <>
                <div style={getDotStyle('NW')} onMouseDown={(e) => onResize('NW', element, e)}></div>
                <div style={getDotStyle('NE')} onMouseDown={(e) => onResize('NE', element, e)}></div>
                <div style={getDotStyle('SE')} onMouseDown={(e) => onResize('SE', element, e)}></div>
                <div style={getDotStyle('SW')} onMouseDown={(e) => onResize('SW', element, e)}></div>
            </>
        ) : (
            <>
                <div style={getDotStyle('NW')} onMouseDown={(e) => onResize('NW', element, e)}></div>
                <div style={getDotStyle('N')} onMouseDown={(e) => onResize('N', element, e)}></div>
                <div style={getDotStyle('NE')} onMouseDown={(e) => onResize('NE', element, e)}></div>
                <div style={getDotStyle('E')} onMouseDown={(e) => onResize('E', element, e)}></div>
                <div style={getDotStyle('SE')} onMouseDown={(e) => onResize('SE', element, e)}></div>
                <div style={getDotStyle('S')} onMouseDown={(e) => onResize('S', element, e)}></div>
                <div style={getDotStyle('SW')} onMouseDown={(e) => onResize('SW', element, e)}></div>
                <div style={getDotStyle('W')} onMouseDown={(e) => onResize('W', element, e)}></div>
            </>
        );
    };

    useEffect(() => {
        isSelected = currentElements.some((element) => element === elementRef.current);
    }, [currentElements]);

    useEffect(() => {
        console.log(text);
        if (tagName === 'IMAGE') {
            const asyncGetImgStyle = async () => {
                const imgStyle = await getImgStyle();
                setElementStyle({
                    top: 0,
                    left: 0,
                    width: imgStyle.width,
                    height: imgStyle.height,
                    transform: currentStyle.transform,
                    zIndex: 100,
                    position: 'absolute' as 'absolute',
                });
            };
            asyncGetImgStyle();
        } else {
            setElementStyle(calculateBaseStyle());
        }
        if (!elementRef.current || tagName !== 'TEXT') return;
        keyToCurrentElements([elementRef.current]);
        (elementRef.current.children[0] as HTMLElement).focus();
    }, []);

    return (
        <>
            {tagName === 'RECTANGULAR' ? (
                <div
                    className="editorElement RECTANGULAR"
                    onClick={() => keyToCurrentElements([elementRef.current])}
                    style={elementStyle as React.CSSProperties}
                    onMouseDown={(e) => isSelected && onDraggable(e, element)}
                    ref={elementRef as RefObject<HTMLDivElement>}
                    id={`${idx}`}
                >
                    {isSelected && getBorderController(tagName)}
                </div>
            ) : tagName === 'TEXT' ? (
                <div
                    className="editorElement TEXT"
                    style={elementStyle as React.CSSProperties}
                    onClick={() => keyToCurrentElements([elementRef.current])}
                    onMouseDown={(e) => isSelected && !isDoubleClicked && onDraggable(e, element)}
                    ref={elementRef as RefObject<HTMLDivElement>}
                    onKeyDown={(e) => e.stopPropagation()}
                    onDoubleClick={(e) => {
                        const editerbleDiv = elementRef.current!.firstElementChild! as HTMLInputElement;
                        editerbleDiv.focus();
                        setIsDoubleClickedFunc(true);
                    }}
                    id={`${idx}`}
                >
                    <InputDiv
                        contentEditable={true}
                        isDoubleClicked={isDoubleClicked}
                        spellCheck={false}
                        onBlur={() => setIsDoubleClickedFunc(false)}
                        suppressContentEditableWarning={true}
                        dangerouslySetInnerHTML={{ __html: text || '' }}
                    ></InputDiv>
                    {isSelected && getBorderController(tagName)}
                </div>
            ) : (
                <ImgDiv
                    className="editorElement IMAGE"
                    onClick={() => keyToCurrentElements([elementRef.current])}
                    style={elementStyle as React.CSSProperties}
                    onMouseDown={(e) => isSelected && onDraggable(e, element)}
                    ref={elementRef as RefObject<HTMLDivElement>}
                    draggable={false}
                    imageSrc={image ? image.originalImage : imageSrc!}
                    data-artwork={image ? image.id : artworkId!}
                >
                    {isSelected && getBorderController(tagName)}
                </ImgDiv>
            )}
        </>
    );
};
interface ImgDivProps {
    imageSrc: string;
}
const ImgDiv = styled.div<ImgDivProps>`
    background-image: url(${(props) => props.imageSrc});
    background-size: contain;
    background-repeat: no-repeat;
`;
interface InputDivProps {
    isDoubleClicked: boolean;
}
const InputDiv = styled.div<InputDivProps>`
    background-color: transparent;
    overflow: hidden;
    width: 100%;
    height: 100%;
    &:focus {
        outline: 0px;
    }
    pointer-events: ${(props) => (props.isDoubleClicked ? 'auto' : 'none')};
`;

export default EditorElement;
