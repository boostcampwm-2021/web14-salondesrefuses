import { AuctionCardProps, ExhibitionCardProps } from '@const/card-type';
import { useEffect, useRef } from 'react';

let observer: IntersectionObserver | null;

const useInfiniteScroll = (handlePage: () => void, items: ExhibitionCardProps[] | AuctionCardProps[]) => {
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
                    rootMargin: '50% 0px 0px 0px',
                },
            );
        }
        observer.observe(gridRef.current.lastChild as Element);
        return () => {
            observer = null;
        };
    }, [items.length]);

    return gridRef;
};

export default useInfiniteScroll;
