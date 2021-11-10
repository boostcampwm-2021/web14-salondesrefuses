import EditorElement from './EditorElement';

export const onDraggable = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    element: HTMLElement | null,
) => {
    const dom = element?.getBoundingClientRect();
    if (!dom || !element) return;

    let shiftX = e.clientX - dom.left;
    let shiftY = e.clientY - dom.top + element.offsetHeight / 2;

    element.style.setProperty('position', 'absolute');

    const onMouseMove = (ev: MouseEvent) => {
        element.style.setProperty('left', `${ev.pageX - shiftX}px`);
        element.style.setProperty('top', `${ev.pageY - shiftY}px`);
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
export const getLineStyle = (
    p1: number[],
    p2: number[],
    originStartPoint: number[],
    originEndPoint: number[],
) => {
    const distX = p2[0] - p1[0];
    const distY = p2[1] - p1[1];
    const width = originEndPoint[0] - originStartPoint[0];
    const height = originEndPoint[1] - originStartPoint[1];
    const degree = distX ? 90 : 0;
    let trans1, trans2;
    if (degree) {
        trans1 = width / 2;
        trans2 = p1[1] > originStartPoint[1] ? height / 2 : (height / 2) * -1;
    } else {
        trans1 = p1[0] > originStartPoint[0] ? width : 0;
        trans2 = 0;
    }
    return {
        position: 'absolute' as 'absolute',
        transform: `translate(${trans1}px,${trans2}px) rotate(${degree}deg)`,
        height: '100px',
        width: '1px',
        content: '',
        backgroundColor: '#3A8FD6',
    };
};

export const getDotStyle = (
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
        cursor: 'crosshair',
    };
};
