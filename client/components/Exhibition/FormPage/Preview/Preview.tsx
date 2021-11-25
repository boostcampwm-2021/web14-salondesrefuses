import usePreviewImage from '@hooks/usePreviewImage';
import React from 'react';

interface PreviewProps {
    image: File | string;
}

const Preview = ({ image }: PreviewProps) => {
    if (typeof image === 'string') {
        return <img src={image as string} alt="preview" />;
    } else {
        const { imageRef } = usePreviewImage(image);
        return <img ref={imageRef} src="" alt="preview" />;
    }
};

export default Preview;
