import React, { useState } from 'react';
import { onResponseSuccess, holdExhibition } from 'utils/networking';
import { useRouter } from 'next/router';
import useToastState from '@store/toastState';

interface IExhibitionInput {
    title: string;
    startAt: string;
    endAt: string;
    theme: string;
    collaborator: string;
    description: string;
    thumbnail: File | null;
}

const initialInput = {
    title: '',
    startAt: '',
    endAt: '',
    theme: '',
    collaborator: '',
    description: '',
    thumbnail: null,
};

const useInputExhibition = () => {
    const router = useRouter();

    const [exhibitionInput, setExhibitionInput] = useState<IExhibitionInput>(initialInput);
    const { title, collaborator, theme, description, startAt, endAt, thumbnail } = exhibitionInput;
    const [toast, setToast] = useToastState();

    const onClickHold = async (contents: string, editorSize: string, artworkIds: string) => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('collaborator', collaborator);
        formData.append('theme', theme);
        formData.append('description', description);
        formData.append('startAt', startAt);
        formData.append('endAt', endAt);
        formData.append('contents', contents);
        formData.append('size', editorSize);
        formData.append('thumbnail', thumbnail!);
        formData.append('artworkIds', artworkIds);
        const result = await holdExhibition(formData);
        if (onResponseSuccess(result.status)) {
            setToast({
                show: true,
                content: '전시회 개최에 성공했습니다.',
            });
            setTimeout(() => {
                setToast({ ...toast, show: false });
            }, 3000);
            router.push(`/exhibition/${result.data.id}`);
        } else {
            setToast({
                show: true,
                content: '전시회 개최에 실패했습니다.',
            });
            setTimeout(() => {
                setToast({ ...toast, show: false });
            }, 3000);
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

    const onChangeThumbnail = (current: HTMLInputElement | null) => {
        current!.files && setExhibitionInput({ ...exhibitionInput, thumbnail: current!.files[0] });
    };

    return {
        formInput: {
            title,
            startAt,
            endAt,
            theme,
            collaborator,
            description,
            thumbnail,
            onChangeTitleInput,
            onChangeStartAt,
            onChangeEndAt,
            onChangeTheme,
            onChangeCollaborator,
            onChangeDescription,
            onChangeThumbnail,
        },
        onClickHold,
    };
};

export default useInputExhibition;
