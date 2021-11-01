import { useState, useEffect } from 'react';

const useControlModalPosition = () => {
    const [modalPositionBottom, setModalPositionBottom] = useState('-53vh');

    // 왜인지 모르겠는데 안먹음...
    const onClickHiddenModal = () => {
        setModalPositionBottom('-50vh');
    };

    const onWheelModal = (e: WheelEvent) => {
        if (e.deltaY > 30) setModalPositionBottom('20vh');
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.addEventListener('wheel', onWheelModal);
        return () => {
            document.body.style.overflow = 'visible';
            document.removeEventListener('wheel', onWheelModal);
        };
    }, []);

    return { modalPositionBottom, setModalPositionBottom };
};

export default useControlModalPosition;
