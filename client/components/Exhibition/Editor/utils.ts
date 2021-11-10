import EditorElement from './EditorElement';

export const onDraggable = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    elementRef: React.RefObject<HTMLDivElement>,
) => {
    const element = elementRef.current;
    const dom = element?.getBoundingClientRect();
    if (!dom || !element) return;

    let shiftX = e.clientX - dom.left;
    let shiftY = e.clientY - dom.top + element.offsetHeight / 2;

    element.style.setProperty('position', 'absolute');

    const onMouseMove = (e: any) => {
        element.style.setProperty('left', `${e.pageX - shiftX}px`);
        element.style.setProperty('top', `${e.pageY - shiftY}px`);
    };

    document.addEventListener('mousemove', onMouseMove);

    const removeEvent = () => {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
    document.body.onmouseup = removeEvent;
};
