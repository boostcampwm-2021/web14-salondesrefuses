import React, { useEffect, useState, useRef, RefObject } from 'react';
import { EditorElementStyle, EditorElementType } from '.';
import { onDraggable, getPositions, getLineStyle, getDotStyle } from './utils';

interface Prop {
    style: EditorElementStyle;
    editable?: boolean;
    type: EditorElementType;
    imgSrc?: string;
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
    imgSrc,
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

    useEffect(() => {
        type === 'TEXT' && elementRef.current && elementRef.current.focus();
    }, []);

    const calculateStyle = () => {
        return {
            transform: `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`,
            width: `${currentStyle.size.width}px`,
            height: `${currentStyle.size.height}px`,
            backgroundColor: currentStyle.backgroundColor,
        };
    };

    const getBorderController = () => {
        return (
            <>
                {getLines()}
                {getDots()}
            </>
        );
    };

    const getDots = () => {
        return (
            <>
                <div style={getDotStyle('NW', LT, LT)}></div>
                <div style={getDotStyle('N', LT, LT, RT)}></div>
                <div style={getDotStyle('NE', LT, RT)}></div>
                <div style={getDotStyle('E', LT, RT, RB)}></div>
                <div style={getDotStyle('SE', LT, RB)}></div>
                <div style={getDotStyle('S', LT, LB, RB)}></div>
                <div style={getDotStyle('SW', LT, LB)}></div>
                <div style={getDotStyle('W', LT, LB, LT)}></div>
            </>
        );
    };

    const getLines = () => {
        return (
            <>
                <div
                    className="lines"
                    style={getLineStyle(LT, LB, LT, RB)}
                ></div>
                <div
                    className="lines"
                    style={getLineStyle(LT, RT, LT, RB)}
                ></div>
                <div
                    className="lines"
                    style={getLineStyle(LB, RB, LT, RB)}
                ></div>
                <div
                    className="lines"
                    style={getLineStyle(RT, RB, LT, RB)}
                ></div>
            </>
        );
    };

    useEffect(() => {
        isSelected = currentElements.some(
            (element) => element === elementRef.current,
        );
    }, [currentElements]);

    return (
        <>
            {type === 'RECTANGULAR' ? (
                <div
                    onClick={() => keyToCurrentElements([elementRef.current])}
                    style={calculateStyle()}
                    onMouseDown={(e) => onDraggable(e, element)}
                    ref={elementRef as RefObject<HTMLDivElement>}
                >
                    {isSelected && getBorderController()}
                </div>
            ) : (
                <input
                    type="text"
                    onClick={() => keyToCurrentElements([elementRef.current])}
                    style={calculateStyle()}
                    onMouseDown={(e) => onDraggable(e, element)}
                    ref={elementRef as RefObject<HTMLInputElement>}
                ></input>
            )}
        </>
    );
};

export default EditorElement;
