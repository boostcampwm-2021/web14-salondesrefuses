import React, { useRef, useState, useEffect } from 'react';

import fallbackImage from '@assets/images/fallback-image.png';

interface ILazyImage {
    src: string;
    alt?: string;
}

const LazyImage = ({ src, alt }: ILazyImage) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        function loadImage() {
            setIsLoad(true);
        }

        imageRef.current &&
            imageRef.current.addEventListener('loadImage', loadImage);

        return () => {
            imageRef.current &&
                imageRef.current.removeEventListener('loadImage', loadImage);
        };
    }, []);

    useEffect(() => {
        if (!observer) {
            observer = new IntersectionObserver(onIntersection, {
                threshold: 0.5,
            });
        }
        imageRef.current && observer.observe(imageRef.current);
    }, []);

    return (
        <img src={isLoad ? src : fallbackImage.src} alt={alt} ref={imageRef} />
    );
};

let observer: IntersectionObserver | null = null;

const onIntersection = (
    entries: IntersectionObserverEntry[],
    io: IntersectionObserver,
) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            io.unobserve(entry.target);
            entry.target.dispatchEvent(new CustomEvent('loadImage'));
        }
    });
};

export default LazyImage;
