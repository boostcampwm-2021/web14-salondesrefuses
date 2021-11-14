import React, { lazy } from 'react';

interface ILazyImage {
    src: string;
    alt?: string;
}

const LazyImage = ({ src, alt }: ILazyImage) => {
    return <img src={src} alt={alt} />;
};

export default LazyImage;
