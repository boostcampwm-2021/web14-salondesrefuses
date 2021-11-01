import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import ArtworkFilter from './ArtworkFilter';

interface ArtworkModalProps {
    setData: React.Dispatch<{ [key: string]: string | number }>;
    position: string;
    onClick: () => void;
    setPosition: React.Dispatch<string>;
}

const ArtworkModal = ({
    setData,
    position,
    setPosition,
}: ArtworkModalProps) => {
    const [checked, setChecked] = useState('artwork');
    const modalRef = useRef<HTMLDivElement | null>(null);

    const onClickConfirm = () => {
        setData({});
        setPosition('-53vh');
    };

    return (
        <Modal bottom={position} ref={modalRef}>
            <ArtworkFilter checked={checked} setChecked={setChecked} />
            <ConfirmButton onClick={onClickConfirm}>confirm</ConfirmButton>
        </Modal>
    );
};

const Modal = styled.div<{ bottom: string }>`
    position: absolute;
    width: 70%;
    height: 550px;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(100px);
    border-radius: 30px;
    padding: 50px;
    bottom: ${(props) => props.bottom};
    z-index: 500;

    transition: bottom 0.2s ease;
`;

const ConfirmButton = styled.button`
    width: 130px;
    height: 40px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background: none;
    border-radius: 10px;
    color: white;
    font-weight: 200;
    font-size: 20px;
    position: absolute;
    bottom: 50px;
    right: 50px;
`;

export default ArtworkModal;
