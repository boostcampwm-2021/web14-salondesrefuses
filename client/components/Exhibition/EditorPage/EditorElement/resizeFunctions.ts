import { directionNames } from './utils';

export const dirctionToResize = (
    direction: directionNames,
    element: HTMLElement | null,
    ev: MouseEvent,
    currentHeight: number,
    currentWidth: number,
    top: number,
    left: number,
    originPoint: number[],
) => {
    resizeFuncObj[direction](element, ev, currentHeight, currentWidth, top, left, originPoint);
};

const NWResize = (
    element: HTMLElement | null,
    ev: MouseEvent,
    currentHeight: number,
    currentWidth: number,
    top: number,
    left: number,
    originPoint: number[],
) => {
    if (!element) return;
    element.style.setProperty(
        'transform',
        `translate(${ev.clientX - originPoint[0] + left}px, ${ev.clientY - originPoint[1] + top}px)`,
    );

    element.style.setProperty('height', `${currentHeight - (ev.clientY - originPoint[1])}px`);
    element.style.setProperty('width', `${currentWidth - (ev.clientX - originPoint[0])}px`);
};
const NResize = (
    element: HTMLElement | null,
    ev: MouseEvent,
    currentHeight: number,
    currentWidth: number,
    top: number,
    left: number,
    originPoint: number[],
) => {
    if (!element) return;
    element.style.setProperty('transform', `translate(${left}px, ${ev.clientY - originPoint[1] + top}px)`);
    element.style.setProperty('height', `${currentHeight - (ev.clientY - originPoint[1])}px`);
};
const NEResize = (
    element: HTMLElement | null,
    ev: MouseEvent,
    currentHeight: number,
    currentWidth: number,
    top: number,
    left: number,
    originPoint: number[],
) => {
    if (!element) return;
    element.style.setProperty('transform', `translate(${left}px, ${ev.clientY - originPoint[1] + top}px)`);
    element.style.setProperty('height', `${currentHeight - (ev.clientY - originPoint[1])}px`);
    element.style.setProperty('width', `${currentWidth + (ev.clientX - originPoint[0])}px`);
};
const EResize = (
    element: HTMLElement | null,
    ev: MouseEvent,
    currentHeight: number,
    currentWidth: number,
    top: number,
    left: number,
    originPoint: number[],
) => {
    if (!element) return;
    element.style.setProperty('width', `${currentWidth + (ev.clientX - originPoint[0])}px`);
};
const SEResize = (
    element: HTMLElement | null,
    ev: MouseEvent,
    currentHeight: number,
    currentWidth: number,
    top: number,
    left: number,
    originPoint: number[],
) => {
    if (!element) return;
    element.style.setProperty('height', `${currentHeight + (ev.clientY - originPoint[1])}px`);
    element.style.setProperty('width', `${currentWidth + (ev.clientX - originPoint[0])}px`);
};
const SResize = (
    element: HTMLElement | null,
    ev: MouseEvent,
    currentHeight: number,
    currentWidth: number,
    top: number,
    left: number,
    originPoint: number[],
) => {
    if (!element) return;
    element.style.setProperty('height', `${currentHeight + (ev.clientY - originPoint[1])}px`);
};
const SWResize = (
    element: HTMLElement | null,
    ev: MouseEvent,
    currentHeight: number,
    currentWidth: number,
    top: number,
    left: number,
    originPoint: number[],
) => {
    if (!element) return;
    element.style.setProperty('transform', `translate(${ev.clientX - originPoint[0] + left}px, ${top}px)`);
    element.style.setProperty('height', `${currentHeight + (ev.clientY - originPoint[1])}px`);
    element.style.setProperty('width', `${currentWidth - (ev.clientX - originPoint[0])}px`);
};
const WResize = (
    element: HTMLElement | null,
    ev: MouseEvent,
    currentHeight: number,
    currentWidth: number,
    top: number,
    left: number,
    originPoint: number[],
) => {
    if (!element) return;
    element.style.setProperty('transform', `translate(${ev.clientX - originPoint[0] + left}px, ${top}px)`);
    element.style.setProperty('width', `${currentWidth - (ev.clientX - originPoint[0])}px`);
};
const resizeFuncObj = {
    NW: NWResize,
    N: NResize,
    NE: NEResize,
    E: EResize,
    SE: SEResize,
    S: SResize,
    SW: SWResize,
    W: WResize,
};
