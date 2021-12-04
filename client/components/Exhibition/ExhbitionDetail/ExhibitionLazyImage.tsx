import React, { useRef, useState, CSSProperties, useEffect } from 'react';
import styled from '@emotion/styled';
import fallbackImage from '@assets/images/fallback-image.png';

interface Props {
    style: CSSProperties | undefined;
    imgUrl: string;
    artworkId: string | undefined;
    setModalNum: (n: string | undefined) => void;
}
const ExhibitionLazyImage = ({ style, imgUrl, artworkId, setModalNum }: Props) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isLoad, setIsLoad] = useState(false);
    const loadImage = () => {
        setIsLoad(true);
    };
    useEffect(() => {
        divRef.current && divRef.current.addEventListener('loadImage', loadImage);
        return () => {
            divRef.current && divRef.current.removeEventListener('loadImage', loadImage);
        };
    }, []);
    useEffect(() => {
        if (!observer) {
            observer = new IntersectionObserver(onIntersection, {
                rootMargin: '100px',
                threshold: 0.1,
            });
        }
        divRef.current && observer.observe(divRef.current);

        return () => {
            observer = null;
        };
    }, []);

    return (
        <AbsoluteImage
            style={style}
            imgUrl={isLoad ? imgUrl : fallbackImage.src}
            ref={divRef}
            onClick={() => setModalNum(artworkId)}
        ></AbsoluteImage>
    );
};

let observer: IntersectionObserver | null = null;

const onIntersection = (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            io.unobserve(entry.target);
            entry.target.dispatchEvent(new CustomEvent('loadImage'));
        }
    });
};

const AbsoluteImage = styled.div<{ imgUrl: string }>`
    position: absolute;
    cursor: zoom-in;
    background-image: url(${(props) => props.imgUrl});
    background-size: contain;
    background-repeat: no-repeat;
`;

export default ExhibitionLazyImage;
