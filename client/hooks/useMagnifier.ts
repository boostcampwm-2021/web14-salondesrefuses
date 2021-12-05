import { useRef, useEffect } from 'react';

const useMagnifier = () => {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const magnifierRef = useRef<HTMLImageElement | null>(null);
    const zoomLevel = 2;

    const getCursorPosition = (e: MouseEvent) => {
        const { top, left } = imageRef.current?.getBoundingClientRect()!;
        const { pageX, pageY } = e;

        return {
            x: pageX - left,
            y: pageY - top,
        };
    };

    const moveMagnifier = (e: MouseEvent) => {
        if (!magnifierRef.current || !imageRef.current) return;

        const radius = Number(window.getComputedStyle(magnifierRef.current).width.split('px')[0]) / 2;
        let { x, y } = getCursorPosition(e);
        let { width, height } = window.getComputedStyle(imageRef.current);
        width = width.split('px')[0];
        height = height.split('px')[0];

        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x > Number(width)) x = Number(width);
        if (y > Number(height)) y = Number(height);

        magnifierRef.current.style.top = `${y}px`;
        magnifierRef.current.style.left = `${x}px`;
        magnifierRef.current.style.backgroundPosition = `-${x * zoomLevel - radius}px -${y * zoomLevel - radius}px`;
    };

    const showMagnify = () => {
        magnifierRef.current!.classList.toggle('setVisible');
    };

    const imgOnLoadHandle = () => {
        let { width, height } = window.getComputedStyle(imageRef.current!);
        width = width.split('px')[0];
        height = height.split('px')[0];

        magnifierRef.current!.style.backgroundSize = `${Number(width) * zoomLevel}px ${Number(height) * zoomLevel}px`;
    };

    useEffect(() => {
        imageRef.current?.addEventListener('mousemove', moveMagnifier);
        magnifierRef.current?.addEventListener('mousemove', moveMagnifier);

        return () => {
            imageRef.current?.removeEventListener('mousemove', moveMagnifier);
            magnifierRef.current?.removeEventListener('mousemove', moveMagnifier);
        };
    }, []);

    return { imageRef, magnifierRef, showMagnify, imgOnLoadHandle };
};

export default useMagnifier;
