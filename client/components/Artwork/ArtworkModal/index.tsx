import React, { useState, useRef } from 'react';
import ArtworkFilter from './ArtworkFilter';
import { Modal, Form, LightForm, ConfirmButton } from './style';

const date = new Date();

interface ArtworkModalProps {
    handleModalInput: React.Dispatch<{ [key: string]: string }>;
    position: string;
    handleModalPosition: React.Dispatch<string>;
}

const ArtworkModal = ({
    handleModalInput,
    position,
    handleModalPosition,
}: ArtworkModalProps) => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [checked, setChecked] = useState('artwork');
    const [description, setDescription] = useState('');
    const { year, onChangeYear, validateYear } = useInputYear();
    const { bidEnd, onChangeBidEnd, validateBidEnd } = useInputBidEnd();
    const { price, onChangePrice, validatePrice } = useInputPrice();
    const onChangeDescription = (e: React.FormEvent) => {
        setDescription((e.target as HTMLTextAreaElement).value);
    };

    const onClickConfirm = () => {
        handleModalInput({
            description,
            year,
            bidEnd,
            checked,
        });
        handleModalPosition('-560px');
    };

    return (
        <Modal bottom={position} ref={modalRef}>
            <ArtworkFilter
                checked={checked}
                setChecked={(checked) => setChecked(checked)}
            />
            <Form>
                <span>Description</span>
                <textarea
                    cols={10}
                    value={description}
                    onChange={onChangeDescription}
                />
            </Form>
            {checked === 'auction' && (
                <>
                    <LightForm>
                        <span>Year</span>
                        <input
                            type="text"
                            value={year}
                            onChange={onChangeYear}
                        />
                        {!validateYear && <p>input right format</p>}
                    </LightForm>
                    <LightForm>
                        <span>Bid End</span>
                        <input
                            type="text"
                            value={bidEnd}
                            onChange={onChangeBidEnd}
                            placeholder="yyyy-mm-dd"
                        />
                        {!validateBidEnd && <p>input right format</p>}
                    </LightForm>
                    <LightForm>
                        <span>Start Price</span>
                        <div>
                            <div>
                                <input
                                    type="text"
                                    value={price ?? 0}
                                    onChange={onChangePrice}
                                    placeholder={`${price} ETH`}
                                />
                                {!validatePrice && <p>input right format</p>}
                            </div>
                            <span>ETH</span>
                        </div>
                    </LightForm>
                </>
            )}
            <ConfirmButton onClick={onClickConfirm}>confirm</ConfirmButton>
        </Modal>
    );
};

const useInputYear = () => {
    const [year, setYear] = useState(date.getFullYear().toString());
    const [validateYear, setValidateYear] = useState(true);

    const onChangeYear = (e: React.FormEvent) => {
        const input = (e.target as HTMLInputElement).value;
        if (!RegExp(/\d{4}/gi).test(input) && input.length > 0)
            setValidateYear(false);
        else setValidateYear(true);
        setYear(input);
    };

    return { year, onChangeYear, validateYear };
};

const useInputBidEnd = () => {
    const [bidEnd, setBidEnd] = useState('');
    const [validateBidEnd, setValidateBidEnd] = useState(true);

    const onChangeBidEnd = (e: React.FormEvent) => {
        const input = (e.target as HTMLInputElement).value;
        const regex = RegExp(
            /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/gi,
        );
        if (!regex.test(input) && input.length > 0) setValidateBidEnd(false);
        else setValidateBidEnd(true);
        setBidEnd(input);
    };

    return { bidEnd, onChangeBidEnd, validateBidEnd };
};

const useInputPrice = () => {
    const [price, setPrice] = useState('0');
    const [validatePrice, setValidatePrice] = useState(true);

    const onChangePrice = (e: React.FormEvent) => {
        const input = (e.target as HTMLInputElement).value;
        const regex = RegExp(/[0-9.]+/gi);
        if (!regex.test(input) && input.length > 0) setValidatePrice(false);
        else setValidatePrice(true);
        setPrice(input);
    };

    return { price, onChangePrice, validatePrice };
};

export default ArtworkModal;
