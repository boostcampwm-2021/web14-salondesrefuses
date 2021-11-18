import usePreviewImage from '@hooks/usePreviewImage';
import React from 'react';

interface PreviewProps {
    image: File;
}

const Preview = ({ image }: PreviewProps) => {
    const { imageRef } = usePreviewImage(image);

    return <img ref={imageRef} src="" alt="preview" />;
};

export default Preview;
