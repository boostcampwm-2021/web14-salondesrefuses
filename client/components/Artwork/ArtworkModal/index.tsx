import useArtworkInput from '@hooks/useArtworkInput';
import React, { useRef } from 'react';
import ArtworkFilter from '../ArtworkFilter';
import { Modal, Form, LightForm, ConfirmButton } from './style';

interface ArtworkModalProps {
    handleModalInput: React.Dispatch<{ [key: string]: string }>;
    position: string;
    handleModalPosition: React.Dispatch<string>;
    onClick: () => void;
}

const ArtworkModal = ({ handleModalInput, position, handleModalPosition, onClick }: ArtworkModalProps) => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const {
        handleChecked,
        onChangeDescription,
        onChangeBidEnd,
        onChangePrice,
        onChangeYear,
        artworkInput,
        validInput,
    } = useArtworkInput();

    const onClickConfirm = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleModalInput({ ...artworkInput });
        handleModalPosition('calc(100% - 45px)');
    };

    return (
        <Modal bottom={position} ref={modalRef} onClick={onClick}>
            <ArtworkFilter checked={artworkInput.checked} setChecked={(checked) => handleChecked(checked)} />
            <Form>
                <span>Description</span>
                <textarea cols={10} value={artworkInput.description} onChange={onChangeDescription} />
            </Form>
            {artworkInput.checked === 'auction' && (
                <>
                    <LightForm>
                        <span>Year</span>
                        <input type="text" value={artworkInput.year} onChange={onChangeYear} />
                        {!validInput.year && <p>input right format</p>}
                    </LightForm>
                    <LightForm>
                        <span>Bid End</span>
                        <input
                            type="text"
                            value={artworkInput.bidEnd}
                            onChange={onChangeBidEnd}
                            placeholder="yyyy-mm-dd hh:mm"
                        />
                        {!validInput.bidEnd && <p>input right format</p>}
                    </LightForm>
                    <LightForm>
                        <span>Start Price</span>
                        <div>
                            <div>
                                <input
                                    type="text"
                                    value={artworkInput.price ?? 0}
                                    onChange={onChangePrice}
                                    placeholder={`${artworkInput.price} ETH`}
                                />
                                {!validInput.price && <p>input right format</p>}
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

export default ArtworkModal;
