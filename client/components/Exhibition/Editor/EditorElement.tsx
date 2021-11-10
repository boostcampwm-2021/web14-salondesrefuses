import React, { useEffect, useState, useRef } from 'react';
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
    const element = elementRef?.current;
    const [LT, LB, RT, RB] = getPositions(element);

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
                {getSpots()}
            </>
        );
    };

    const getSpots = () => {
        return (
            <>
                <div className="dot LW" style={getDotStyle(LT, LT)}></div>
                <div className="dot N" style={getDotStyle(LT, LT, RT)}></div>
                <div className="dot NE" style={getDotStyle(LT, RT)}></div>
                <div className="dot E" style={getDotStyle(LT, RT, RB)}></div>
                <div className="dot SE" style={getDotStyle(LT, RB)}></div>
                <div className="dot S" style={getDotStyle(LT, LB, RB)}></div>
                <div className="dot SW" style={getDotStyle(LT, LB)}></div>
                <div className="dot W" style={getDotStyle(LT, LB, LT)}></div>
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
        isSelected = currentElements.includes(idx);
    }, [currentElements]);

    return (
        <div
            onClick={() => keyToCurrentElements([idx])}
            style={calculateStyle()}
            onMouseDown={(e) => isSelected && onDraggable(e, element)}
            ref={elementRef}
        >
            {isSelected && getBorderController()}
        </div>
    );
};

export default EditorElement;
