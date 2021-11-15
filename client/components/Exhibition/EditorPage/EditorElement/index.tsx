import React, { useEffect, useState, useRef, RefObject } from 'react';
import styled from '@emotion/styled';

import { Artwork } from 'interfaces';
import { EditorElementStyle, EditorElementType } from '../Editor/types';
import { onDraggable, getPositions, getDotStyle, onResize } from './utils';
import { Center } from '@styles/common';

interface Prop {
    style: EditorElementStyle;
    editable?: boolean;
    type: EditorElementType;
    image?: Artwork;
    text?: string;
    align?: string;
    idx: number;
    currentElements: Array<HTMLElement | null>;
    keyToCurrentElements: (arr: Array<HTMLElement | null>) => void;
}

const EditorElement = ({
    style,
    editable = true,
    type,
    image,
    text,
    align,
    idx,
    currentElements = [],
    keyToCurrentElements,
}: Prop) => {
    const elementRef = useRef<HTMLElement | null>(null);
    const positionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const [currentStyle, setCurrentStyle] = useState(style);
    let isSelected = currentElements.some(
        (element) => element === elementRef.current,
    );
    const element = elementRef?.current;
    const [LT, LB, RT, RB] = getPositions(element);

    const calculateStyle = () => {
        return {
            transform: `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`,
            width: `${currentStyle.size.width}px`,
            height: `${currentStyle.size.height}px`,
            backgroundColor: currentStyle.backgroundColor,
            position: 'absolute' as 'absolute',
            border: isSelected ? '1px solid #3A8FD6' : '0px',
        };
    };

    const getBorderController = () => {
        return <>{getDots()}</>;
    };

    const getDots = () => {
        return (
            <div>
                <div
                    style={getDotStyle('NW')}
                    onMouseDown={(e) => onResize('NW', element, e)}
                ></div>
                <div
                    style={getDotStyle('N')}
                    onMouseDown={(e) => onResize('N', element, e)}
                ></div>
                <div
                    style={getDotStyle('NE')}
                    onMouseDown={(e) => onResize('NE', element, e)}
                ></div>
                <div
                    style={getDotStyle('E')}
                    onMouseDown={(e) => onResize('E', element, e)}
                ></div>
                <div
                    style={getDotStyle('SE')}
                    onMouseDown={(e) => onResize('SE', element, e)}
                ></div>
                <div
                    style={getDotStyle('S')}
                    onMouseDown={(e) => onResize('S', element, e)}
                ></div>
                <div
                    style={getDotStyle('SW')}
                    onMouseDown={(e) => onResize('SW', element, e)}
                ></div>
                <div
                    style={getDotStyle('W')}
                    onMouseDown={(e) => onResize('W', element, e)}
                ></div>
            </div>
        );
    };

    useEffect(() => {
        isSelected = currentElements.some(
            (element) => element === elementRef.current,
        );
    }, [currentElements]);

    useEffect(() => {
        if (!elementRef.current || type !== 'TEXT') return;
        keyToCurrentElements([elementRef.current]);
        (elementRef.current.children[0] as HTMLElement).focus();
    }, []);

    return (
        <>
            {type === 'RECTANGULAR' ? (
                <div
                    className="editorElement"
                    onClick={() => keyToCurrentElements([elementRef.current])}
                    style={calculateStyle()}
                    onMouseDown={(e) => isSelected && onDraggable(e, element)}
                    ref={elementRef as RefObject<HTMLDivElement>}
                    onKeyDown={(e) => isSelected && console.log(e)}
                >
                    {isSelected && getBorderController()}
                </div>
            ) : type === 'TEXT' ? (
                <div
                    className="editorElement"
                    style={calculateStyle()}
                    onClick={() => keyToCurrentElements([elementRef.current])}
                    onMouseDown={(e) => isSelected && onDraggable(e, element)}
                    ref={elementRef as RefObject<HTMLDivElement>}
                >
                    <InputDiv contentEditable={true}></InputDiv>
                    {isSelected && getBorderController()}
                </div>
            ) : (
                <img
                    className="editorElement"
                    src={image!.originalImage}
                    onClick={() => keyToCurrentElements([elementRef.current])}
                    style={calculateStyle()}
                    onMouseDown={(e) => isSelected && onDraggable(e, element)}
                    ref={elementRef as RefObject<HTMLImageElement>}
                    draggable={false}
                />
            )}
        </>
    );
};
const InputDivWrapper = styled.div`
    ${Center}
`;
const InputDiv = styled.div`
    background-color: transparent;
    overflow: hidden;
    width: 100%;
    height: 100%;
    &:focus {
        outline: 0px;
    }
`;

export default EditorElement;
