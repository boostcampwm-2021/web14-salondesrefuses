import { useState, useEffect } from 'react';

const useControlModalPosition = () => {
    const [modalPositionTop, setModalPositionTop] = useState('calc(100% - 45px)');

    const onClickHiddenModal = () => {
        setModalPositionTop('calc(50% - 265px)');
    };

    const onWheelModal = (e: WheelEvent) => {
        if (e.deltaY > 30) setModalPositionTop('calc(50% - 265px)');
        else if (e.deltaY < -30) setModalPositionTop('calc(100% - 45px)');
    };

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

export default useControlModalPosition;
