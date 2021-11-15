import { ExhibitionCardProps } from '@const/card-type';
import { useEffect, useRef } from 'react';

let observer: IntersectionObserver | null;

const useInfiniteScroll = (
    handlePage: () => void,
    exhibitions: ExhibitionCardProps[],
) => {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!gridRef.current || gridRef.current.children.length === 0) return;
        if (!observer) {
            observer = new IntersectionObserver(
                (entries, observer) => {
                    if (!entries[0].isIntersecting) return;
                    observer.disconnect();
                    handlePage();
                },
                {
                    rootMargin: '10% 0px 0px 0px',
                },
            );
        }
        console.log(observer);
        observer.observe(
            gridRef.current.children[gridRef.current.children.length - 1],
        );
    }, [exhibitions.length]);

    return { gridRef };
};

export default useInfiniteScroll;
