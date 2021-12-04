import { useState, useEffect, useCallback } from 'react';

const useControlModalPosition = () => {
    const [modalPositionTop, setModalPositionTop] = useState(HIDE_MODAL_POSITION);

    const onClickHiddenModal = useCallback(() => {
        setModalPositionTop(SHOW_MODAL_POSITION);
    }, []);

    const onWheelModal = useCallback((e: WheelEvent) => {
        if (e.deltaY > WHEEL_EVENT_THRESHOLD) setModalPositionTop(SHOW_MODAL_POSITION);
        else if (e.deltaY < -WHEEL_EVENT_THRESHOLD) setModalPositionTop(HIDE_MODAL_POSITION);
    }, []);

    const handleModalPosition = (bottom: string) => {
        setModalPositionTop(bottom);
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.addEventListener('wheel', onWheelModal);
        return () => {
            document.body.style.overflow = 'visible';
            document.removeEventListener('wheel', onWheelModal);
        };
    }, []);

    return { modalPositionTop, handleModalPosition, onClickHiddenModal };
};

const SHOW_MODAL_POSITION = 'calc(50% - 300px)';
const HIDE_MODAL_POSITION = 'calc(100% - 130px)';
const WHEEL_EVENT_THRESHOLD = 30;

export default useControlModalPosition;
