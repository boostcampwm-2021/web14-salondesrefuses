import EditorElement from './EditorElement';
import { dirctionToResize } from './resizeFunctions';

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
        element.style.setProperty(
            'left',
            `${
                ev.clientX - left - (e.target as HTMLElement).offsetWidth / 2
            }px`,
        );
        element.style.setProperty(
            'top',
            `${
                ev.clientY - top - (e.target as HTMLElement).offsetHeight / 2
            }px`,
        );
    };

    document.addEventListener('mousemove', onMouseMove);

    const removeEvent = () => {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
    document.body.onmouseup = removeEvent;
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
export type directionNames = 'NW' | 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W';
export const getDotStyle = (
    name: directionNames,
    originPoint: number[],
    p1: number[],
    p2?: number[],
) => {
    const [X, Y] = p2 ? [~~((p1[0] + p2[0]) / 2), ~~((p1[1] + p2[1]) / 2)] : p1;
    const [Left, Top] = [X - originPoint[0] - 5, Y - originPoint[1] - 5];
    return {
        position: 'absolute' as 'absolute',
        top: Top,
        left: Left,
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

    const [currentHeight, currentWidth, top, left] = [
        parseInt(element.style.height),
        parseInt(element.style.width),
        parseInt(element.style.top),
        parseInt(element.style.left),
    ];
    const onResizePoint = (ev: MouseEvent) => {
        dirctionToResize(
            direction,
            element,
            ev,
            currentHeight,
            currentWidth,
            top,
            left,
            originPoint,
        );
    };

    document.addEventListener('mousemove', onResizePoint);
    const removeEvent = () => {
        document.removeEventListener('mousemove', onResizePoint);
        element.onmouseup = null;
    };
    document.body.onmouseup = removeEvent;
};

// const setMouseEventListener = (
//     eventType: keyof DocumentEventMap,
//     cb: (this: Document, ev: MouseEvent) => any,
// ) => {
//     document.addEventListener(eventType, cb);
//     const removeEvent = () => {
//         document.removeEventListener(eventType, cb);
//         element.onmouseup = null;
//     };
//     document.body.onmouseup = removeEvent;
// };
