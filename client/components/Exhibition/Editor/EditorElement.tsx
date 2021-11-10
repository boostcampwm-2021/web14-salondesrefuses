import React, { useEffect, useState, useRef, RefObject } from 'react';
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
    const elementRef = useRef<HTMLElement | null>(null);
    const positionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const [currentStyle, setCurrentStyle] = useState(style);

    useEffect(() => {
        type === 'TEXT' && elementRef.current && elementRef.current.focus();
    }, []);

    const moveElement = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
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
        <>
            {type === 'RECTANGULAR' ? (
                <div
                    onClick={onClick}
                    style={calculateStyle()}
                    onMouseDown={(e) => moveElement(e)}
                    ref={elementRef as RefObject<HTMLDivElement>}
                ></div>
            ) : (
                <input
                    type="text"
                    onClick={onClick}
                    style={calculateStyle()}
                    onMouseDown={(e) => moveElement(e)}
                    ref={elementRef as RefObject<HTMLInputElement>}
                ></input>
            )}
        </>
    );
};

export default EditorElement;
