import { dirctionToResize } from './resizeFunctions';

const setMouseEventListener = (
    eventType: keyof DocumentEventMap,
    cb: (this: Document, ev: MouseEvent) => any,
    element: HTMLElement | null,
) => {
    document.addEventListener(eventType, cb as (ev: Event) => void);
    const removeEvent = () => {
        document.removeEventListener(eventType, cb as (ev: Event) => void);
        element!.onmouseup = null;
    };
    document.body.onmouseup = removeEvent;
};

export const onDraggable = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    element: HTMLElement | null,
) => {
    const dom = element?.getBoundingClientRect();
    if (!dom || !element) return;
    const onMouseMove = (ev: MouseEvent) => {
        const { left, top } = (
            e.target as HTMLElement
        ).parentElement?.getBoundingClientRect()!;
        let newX =
            ev.clientX - left - (e.target as HTMLElement).offsetWidth / 2;
        let newY =
            ev.clientY - top - (e.target as HTMLElement).offsetHeight / 2;

        element.style.setProperty(
            'transform',
            `translate(${newX}px, ${newY}px)`,
        );
    };

    setMouseEventListener('mousemove', onMouseMove, element);
};

export const getPositions = (element: HTMLElement | null) => {
    if (!element)
        return [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ];
    const { left, top, right, bottom } = element.getBoundingClientRect();
    return [
        [left, top],
        [left, bottom],
        [right, top],
        [right, bottom],
    ];
};

const getMouseCursor = (name: directionNames) => {
    return `${name.toLowerCase()}-resize`;
};
const getDotsPosition = {
    NW: ['0%', '0%'],
    N: ['50%', '0%'],
    NE: ['100%', '0%'],
    E: ['100%', '50%'],
    SE: ['100%', '100%'],
    S: ['50%', '100%'],
    SW: ['0%', '100%'],
    W: ['0%', '50%'],
};
export type directionNames = 'NW' | 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W';
export type imageDirectionNames = 'NW' | 'NE' | 'SE' | 'SW';
export const getDotStyle = (name: directionNames | imageDirectionNames) => {
    return {
        position: 'absolute' as 'absolute',
        top: `calc(${getDotsPosition[name][1]} - 5px)`,
        left: `calc(${getDotsPosition[name][0]} - 5px)`,
        backgroundColor: '#3A8FD6',
        borderRadius: '10px',
        border: '2px solid #eee',
        width: '10px',
        height: '10px',
        cursor: getMouseCursor(name),
    };
};

export const onResize = (
    direction: directionNames,
    element: HTMLElement | null,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
) => {
    e.stopPropagation();
    const dom = element?.getBoundingClientRect();
    if (!dom || !element) return;
    let originPoint = [e.clientX, e.clientY];

    let [left, top] = element.style.transform
        .replace(/[^0-9.]+/g, ' ')
        .split(' ')
        .filter(Boolean);
    const [currentHeight, currentWidth] = [
        parseInt(element.style.height),
        parseInt(element.style.width),
    ];
    const onResizePoint = (ev: MouseEvent) => {
        dirctionToResize(
            direction,
            element,
            ev,
            currentHeight,
            currentWidth,
            parseInt(top),
            parseInt(left),
            originPoint,
        );
    };

    setMouseEventListener('mousemove', onResizePoint, element);
};
