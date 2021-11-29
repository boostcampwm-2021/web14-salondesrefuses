import { useState } from 'react';

interface IArtworkInput {
    checked: string;
    description: string;
    year: string;
    bidEnd: string;
    price: string;
}

const initialInputState = {
    checked: 'artwork',
    description: '',
    year: new Date().getFullYear().toString(),
    bidEnd: '',
    price: '0',
};

const initialValidState = {
    year: true,
    bidEnd: false,
    price: false,
};

interface IValidState {
    year: boolean;
    bidEnd: boolean;
    price: boolean;
}

const useArtworkInput = () => {
    const [artworkInput, setArtworkInput] = useState<IArtworkInput>(initialInputState);
    const [validInput, setValidInput] = useState<IValidState>(initialValidState);

    const onChangeDescription = (e: React.FormEvent) => {
        setArtworkInput({ ...artworkInput, description: (e.target as HTMLTextAreaElement).value });
    };

    const handleChecked = (s: string) => {
        setArtworkInput({ ...artworkInput, checked: s });
    };

    const onChangeYear = (e: React.FormEvent) => {
        const input = (e.target as HTMLInputElement).value;
        if (!RegExp(/^[12][\d]{3}$/gi).test(input) && input.length > 0) setValidInput({ ...validInput, year: false });
        else setValidInput({ ...validInput, year: true });
        setArtworkInput({ ...artworkInput, year: input });
    };

    const onChangeBidEnd = (e: React.FormEvent) => {
        const input = (e.target as HTMLInputElement).value;
        const regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/gi);
        if (!regex.test(input) && input.length > 0) setValidInput({ ...validInput, bidEnd: false });
        else setValidInput({ ...validInput, bidEnd: true });
        setArtworkInput({ ...artworkInput, bidEnd: input });
    };

    const onChangePrice = (e: React.FormEvent) => {
        const input = (e.target as HTMLInputElement).value;
        const regex = RegExp(/^[0-9.]+$/gi);
        if (!regex.test(input) && input.length > 0) setValidInput({ ...validInput, price: false });
        else setValidInput({ ...validInput, price: true });
        setArtworkInput({ ...artworkInput, price: input });
    };

    return {
        artworkInput,
        validInput,
        onChangeDescription,
        onChangeYear,
        onChangeBidEnd,
        onChangePrice,
        handleChecked,
    };
};

export default useArtworkInput;
