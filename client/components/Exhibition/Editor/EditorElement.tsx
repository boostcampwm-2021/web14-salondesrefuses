import React, { useEffect, useState, useRef } from 'react';
import { EditorElementStyle, EditorElementType } from '.';

interface Prop {
    style: EditorElementStyle;
    editable?: boolean;
    type: EditorElementType;
    imgSrc?: string;
    text?: string;
    align?: string;
    onClick: (e: React.MouseEvent) => void;
}

const EditorElement = ({
    style,
    editable = true,
    type,
    imgSrc,
    text,
    align,
    onClick,
}: Prop) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const positionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const [currentStyle, setCurrentStyle] = useState(style);

    const moveElement = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const element = elementRef.current;
        const dom = element?.getBoundingClientRect();
        if (!dom || !element) return;

        let shiftX = e.clientX - dom.left;
        let shiftY = e.clientY - dom.top + element.offsetHeight / 2;

        element.style.setProperty('position', 'absolute');

        const onMouseMove = (e: any) => {
            element.style.setProperty('left', `${e.pageX - shiftX}px`);
            element.style.setProperty('top', `${e.pageY - shiftY}px`);
        };

        document.addEventListener('mousemove', onMouseMove);

        const removeEvent = () => {
            document.removeEventListener('mousemove', onMouseMove);
            element.onmouseup = null;
        };
        document.body.onmouseup = removeEvent;
    };
    const calculateStyle = () => {
        return {
            transform: `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`,
            width: `${currentStyle.size.width}px`,
            height: `${currentStyle.size.height}px`,
            backgroundColor: currentStyle.backgroundColor,
        };
    };

    return (
        <div
            onClick={onClick}
            style={calculateStyle()}
            onMouseDown={(e) => moveElement(e)}
            ref={elementRef}
        ></div>
    );
};

export default EditorElement;
