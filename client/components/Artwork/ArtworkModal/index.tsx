import React, { useState, useRef } from 'react';
import ArtworkFilter from './ArtworkFilter';
import { Modal, Form, LightForm, ConfirmButton } from './style';

interface ArtworkModalProps {
    setData: React.Dispatch<{ [key: string]: string }>;
    position: string;
    setPosition: React.Dispatch<string>;
}

const ArtworkModal = ({
    setData,
    position,
    setPosition,
}: ArtworkModalProps) => {
    const [checked, setChecked] = useState('artwork');
    const modalRef = useRef<HTMLDivElement | null>(null);

    const descriptionInputRef = useRef<HTMLTextAreaElement | null>(null);
    const yearInputRef = useRef<HTMLInputElement | null>(null);
    const bidEndInputRef = useRef<HTMLInputElement | null>(null);

    const onClickConfirm = () => {
        setData({
            description: descriptionInputRef.current!.value,
            year: yearInputRef.current!.value,
            bidEnd: bidEndInputRef.current!.value,
        });
        setPosition('-53vh');
    };

    return (
        <Modal bottom={position} ref={modalRef}>
            <ArtworkFilter checked={checked} setChecked={setChecked} />
            <Form>
                <span>Description</span>
                <textarea cols={10} ref={descriptionInputRef} />
            </Form>
            {checked === 'auction' && (
                <>
                    <LightForm>
                        <span>Year</span>
                        <input type="text" ref={yearInputRef} />
                    </LightForm>
                    <LightForm>
                        <span>Bid End</span>
                        <input type="text" ref={bidEndInputRef} />
                    </LightForm>
                </>
            )}
            <ConfirmButton onClick={onClickConfirm}>confirm</ConfirmButton>
        </Modal>
    );
};

export default ArtworkModal;
