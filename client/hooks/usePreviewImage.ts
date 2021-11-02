import { useEffect, useState, useRef } from 'react';

const usePreviewImage = (image: File) => {
    const backgroundImageRef = useRef<HTMLImageElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            backgroundImageRef.current!.src = e.target!.result as string;
            imageRef.current!.src = e.target!.result as string;
        };
        fileReader.readAsDataURL(image);
    }, []);

    return { backgroundImageRef, imageRef };
};

export default usePreviewImage;
