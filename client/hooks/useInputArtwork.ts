import React, { useState, useCallback } from 'react';
import { postArtwork, onResponseSuccess } from 'service/networking';
import { useRouter } from 'next/router';

import useToast from '@hooks/useToast';

const useInputArtwork = (image: File) => {
    const [modalInputData, setModalInputData] = useState<{
        [key: string]: string;
    }>({});
    const router = useRouter();

    const [titleInput, setTitleInput] = useState('');
    const [typeInput, setTypeInput] = useState('');
    const showToast = useToast({
        onSuccess: '작품 등록에 성공했습니다.',
        onFailed: '작품 등록에 실패했습니다.',
    });

    const onClickDone = async () => {
        const formData = new FormData();
        formData.append('title', titleInput.length === 0 ? 'Untitled' : titleInput);
        formData.append('type', typeInput);
        formData.append('description', modalInputData['description']);
        formData.append('year', modalInputData['year']);
        formData.append('endAt', modalInputData['bidEnd']);
        formData.append('price', modalInputData['price']);
        formData.append('isRegisterAuction', (modalInputData['checked'] === 'auction').toString());
        formData.append('image', image);

        const result = await postArtwork(formData);
        if (onResponseSuccess(result.status)) {
            showToast('success');

            modalInputData['checked'] === 'auction'
                ? router.push(`/artwork/result?id=${result.data.id}`)
                : router.reload();
        } else {
            showToast('failed');
        }
    };

    const onChangeTitleInput = useCallback((e: React.FormEvent) => {
        setTitleInput((e.target as HTMLInputElement).value);
    }, []);

    const onChangeTypeInput = useCallback((e: React.FormEvent) => {
        setTypeInput((e.target as HTMLInputElement).value);
    }, []);

    const handleModalInput = useCallback((data: { [key: string]: string }) => {
        setModalInputData(data);
    }, []);

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
