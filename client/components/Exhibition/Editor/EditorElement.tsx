import React, { useEffect, useState, useRef } from 'react';
import { EditorElementStyle, EditorElementType } from '.';
import { onDraggable } from './utils';

interface Prop {
    style: EditorElementStyle;
    editable?: boolean;
    type: EditorElementType;
    imgSrc?: string;
    text?: string;
    align?: string;
    idx: number;
    currentElements: number[];
    keyToCurrentElements: (arr: number[]) => void;
}

const EditorElement = ({
    style,
    editable = true,
    type,
    imgSrc,
    text,
    align,
    idx,
    currentElements = [],
    keyToCurrentElements,
}: Prop) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const positionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const [currentStyle, setCurrentStyle] = useState(style);
    let isSelected = currentElements.includes(idx);
    const calculateStyle = () => {
        return {
            transform: `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`,
            width: `${currentStyle.size.width}px`,
            height: `${currentStyle.size.height}px`,
            backgroundColor: currentStyle.backgroundColor,
        };
    };
    useEffect(() => {
        isSelected = currentElements.includes(idx);
    }, [currentElements]);

    return (
        <div
            onClick={() => keyToCurrentElements([idx])}
            style={calculateStyle()}
            onMouseDown={(e) => isSelected && onDraggable(e, elementRef)}
            ref={elementRef}
        ></div>
    );
};

export default EditorElement;
