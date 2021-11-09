import React, { useEffect, useState, useRef } from 'react';
import { EditorElementStyle, EditorElementType } from '.';

interface Prop {
    style: EditorElementStyle;
    editable?: boolean;
    type: EditorElementType;
    imgSrc?: string;
    text?: string;
    align?: string;
}

const EditorElement = ({
    style,
    editable = true,
    type,
    imgSrc,
    text,
    align,
}: Prop) => {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const positionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const [currentStyle, setCurrentStyle] = useState(style);

    const onDragEnd = (e: React.MouseEvent) => {
        console.log('end');
        calculateStyle();
    };

    const onDrag = (e: React.MouseEvent) => {
        console.log(elementRef?.current?.style.transform);
        positionRef.current = {
            x: e.clientX,
            y: e.clientY,
        };
        elementRef?.current?.style.setProperty('opacity', '1');
    };

    const calculateStyle = () => {
        console.log(positionRef.current);
        return {
            transform: `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`,
            width: `${currentStyle.size.width}px`,
            height: `${currentStyle.size.height}px`,
            backgroundColor: currentStyle.backgroundColor,
        };
    };

    useEffect(() => {
        console.log(elementRef.current);
    }, [elementRef]);

    return (
        <div
            style={calculateStyle()}
            onDragEnd={onDragEnd}
            onDrag={onDrag}
            onMouseOver={() => console.log(elementRef.current)}
            ref={elementRef}
            draggable
        ></div>
    );
};

export default EditorElement;
