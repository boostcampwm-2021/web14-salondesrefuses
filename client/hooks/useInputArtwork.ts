import React, { useState } from 'react';
import { postArtwork, onResponseSuccess } from 'utils/networking';
import { useRouter } from 'next/router';

const useInputArtwork = (image: File) => {
    const [modalInputData, setModalInputData] = useState<{
        [key: string]: string;
    }>({});
    const router = useRouter();

    const [titleInput, setTitleInput] = useState('');
    const [typeInput, setTypeInput] = useState('');

    const onClickDone = async () => {
        const formData = new FormData();
        formData.append(
            'title',
            titleInput.length === 0 ? 'Untitled' : titleInput,
        );
        formData.append('type', typeInput);
        formData.append('description', modalInputData['description']);
        formData.append('year', modalInputData['year']);
        formData.append('endAt', modalInputData['bidEnd']);
        formData.append('image', image);

        const result = await postArtwork(formData);
        if (onResponseSuccess(result.status)) {
            alert('작품 등록에 성공했습니다.');
            router.push('/');
        } else alert('작품 등록에 실패했습니다.');
    };

    const onChangeTitleInput = (e: React.FormEvent) => {
        setTitleInput((e.target as HTMLInputElement).value);
    };

    const onChangeTypeInput = (e: React.FormEvent) => {
        setTypeInput((e.target as HTMLInputElement).value);
    };

    const handleModalInput = (data: { [key: string]: string }) => {
        setModalInputData(data);
    };

    return {
        handleModalInput,
        onChangeTitleInput,
        onChangeTypeInput,
        titleInput,
        typeInput,
        onClickDone,
    };
};

export default useInputArtwork;
