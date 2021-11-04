import React, { useRef, useState } from 'react';

const useInputArtwork = (image: File) => {
    const [modalInputData, setModalInputData] = useState<{
        [key: string]: string;
    }>({});

    const [titleInput, setTitleInput] = useState('');
    const [typeInput, setTypeInput] = useState('');

    const onClickDone = (e: React.MouseEvent) => {
        const formData = new FormData();
        formData.append('title', titleInput);
        formData.append('type', typeInput);
        formData.append('description', modalInputData['description']);
        formData.append('year', modalInputData['year']);
        formData.append('bidEnd', modalInputData['bidEnd']);
        formData.append('image', image);

        // TODO - post FormData to server //
    };

    const onChangeTitleInput = (e: React.FormEvent) => {
        setTitleInput((e.target as HTMLInputElement).value);
    };

    const onChangeTypeInput = (e: React.FormEvent) => {
        setTypeInput((e.target as HTMLInputElement).value);
    };

    return {
        setModalInputData,
        onChangeTitleInput,
        onChangeTypeInput,
        titleInput,
        typeInput,
        onClickDone,
    };
};

export default useInputArtwork;
