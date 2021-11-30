import React, { useState } from 'react';
import { onResponseSuccess, holdExhibition, editExhibition, getExhibitionIds } from 'service/networking';
import { useRouter } from 'next/router';
import useToast from '@hooks/useToast';
import { IExhibitionInput } from 'interfaces';

const initialInput = {
    title: '',
    startAt: '',
    endAt: '',
    theme: '',
    collaborator: '',
    description: '',
    thumbnailImage: null,
};

const useInputExhibition = () => {
    const router = useRouter();
    const [exhibitionInput, setExhibitionInput] = useState<IExhibitionInput>(initialInput);
    const { title, collaborator, theme, description, startAt, endAt, thumbnailImage } = exhibitionInput;
    const showToast = useToast({
        onSuccess: '전시회 개최에 성공했습니다.',
        onFailed: '전시회 개최에 실패했습니다.',
    });

    const onClickHold = async (
        contents: string,
        editorSize: string,
        artworkIds: string,
        exhibitionId: string | undefined,
    ) => {
        const formData = new FormData();
        const isEdit = typeof exhibitionId === 'string';
        formData.append('title', title);
        formData.append('collaborator', collaborator);
        formData.append('theme', theme);
        formData.append('description', description);
        formData.append('startAt', startAt);
        formData.append('endAt', endAt);
        formData.append('contents', contents);
        formData.append('size', editorSize);
        formData.append('thumbnail', thumbnailImage!);
        formData.append('artworkIds', artworkIds);
        isEdit && formData.append('id', exhibitionId);
        formData.forEach((v) => console.log(v));
        const result = isEdit ? await editExhibition(formData) : await holdExhibition(formData);
        if (onResponseSuccess(result.status)) {
            showToast('success');
            isEdit ? router.push(`/exhibition/${exhibitionId}`) : router.push(`/exhibition/${result.data.id}`);
        } else {
            showToast('failed');
        }
    };

    const onChangeTitleInput = (e: React.FormEvent) => {
        setExhibitionInput({ ...exhibitionInput, title: (e.target as HTMLInputElement).value });
    };

    const onChangeStartAt = (e: React.FormEvent) => {
        setExhibitionInput({ ...exhibitionInput, startAt: (e.target as HTMLInputElement).value });
    };

    const onChangeEndAt = (e: React.FormEvent) => {
        setExhibitionInput({ ...exhibitionInput, endAt: (e.target as HTMLInputElement).value });
    };

    const onChangeTheme = (e: React.FormEvent) => {
        setExhibitionInput({ ...exhibitionInput, theme: (e.target as HTMLInputElement).value });
    };

    const onChangeCollaborator = (e: React.FormEvent) => {
        setExhibitionInput({ ...exhibitionInput, collaborator: (e.target as HTMLInputElement).value });
    };

    const onChangeDescription = (e: React.FormEvent) => {
        setExhibitionInput({ ...exhibitionInput, description: (e.target as HTMLInputElement).value });
    };

    const onChangethumbnailImage = (current: HTMLInputElement | null) => {
        current!.files && setExhibitionInput({ ...exhibitionInput, thumbnailImage: current!.files[0] });
    };

    return {
        formInput: {
            title,
            startAt,
            endAt,
            theme,
            collaborator,
            description,
            thumbnailImage,
            onChangeTitleInput,
            onChangeStartAt,
            onChangeEndAt,
            onChangeTheme,
            onChangeCollaborator,
            onChangeDescription,
            onChangethumbnailImage,
        },
        onClickHold,
        setExhibitionInput,
    };
};

export default useInputExhibition;
