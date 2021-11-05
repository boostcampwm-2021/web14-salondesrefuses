import React, { useState, useRef } from 'react';
import ArtworkFilter from './ArtworkFilter';
import { Modal, Form, LightForm, ConfirmButton } from './style';

const date = new Date();

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

    const [descriptionInput, setDescriptionInput] = useState('');
    const [yearInput, setYearInput] = useState(date.getFullYear().toString());
    const [bidEndInput, setBidEndIput] = useState('');

    const onChangeDescription = (e: React.FormEvent) => {
        setDescriptionInput((e.target as HTMLTextAreaElement).value);
    };

    const onChangeYear = (e: React.FormEvent) => {
        setYearInput((e.target as HTMLInputElement).value);
    };

    const onChangeBidEnd = (e: React.FormEvent) => {
        setBidEndIput((e.target as HTMLInputElement).value);
    };

    const onClickConfirm = () => {
        setData({
            description: descriptionInput,
            year: yearInput,
            bidEnd: bidEndInput,
        });
        setPosition('-59vh');
    };

    return (
        <Modal bottom={position} ref={modalRef}>
            <ArtworkFilter checked={checked} setChecked={setChecked} />
            <Form>
                <span>Description</span>
                <textarea
                    cols={10}
                    value={descriptionInput}
                    onChange={onChangeDescription}
                />
            </Form>
            {checked === 'auction' && (
                <>
                    <LightForm>
                        <span>Year</span>
                        <input
                            type="text"
                            value={yearInput}
                            onChange={onChangeYear}
                        />
                    </LightForm>
                    <LightForm>
                        <span>Bid End</span>
                        <input
                            type="text"
                            value={bidEndInput}
                            onChange={onChangeBidEnd}
                            placeholder="yyyy-mm-dd"
                        />
                    </LightForm>
                    <LightForm>
                        <span>Start Price</span>
                        <input
                            type="text"
                            value={bidEndInput}
                            onChange={onChangeBidEnd}
                            placeholder="xxx ETH"
                        />
                    </LightForm>
                </>
            )}
            <ConfirmButton onClick={onClickConfirm}>confirm</ConfirmButton>
        </Modal>
    );
};

export default ArtworkModal;
