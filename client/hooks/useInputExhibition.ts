import React, { useState } from 'react';
import { onResponseSuccess, holdExhibition } from 'utils/networking';
import { useRouter } from 'next/router';

const useInputExhibition = () => {
    const router = useRouter();

    const [titleInput, setTitleInput] = useState('');
    const [startAt, setStartAt] = useState('');
    const [endAt, setEndAt] = useState('');
    const [theme, setTheme] = useState('');
    // const [category, setCategory] = useState('');
    const [collaborator, setCollaborator] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState<File | null>(null);

    const onClickHold = async (contents: string) => {
        const formData = new FormData();
        formData.append('title', titleInput);
        formData.append('collaborator', collaborator);
        formData.append('theme', theme);
        formData.append('description', description);
        formData.append('startAt', startAt);
        formData.append('endAt', endAt);
        formData.append('contents', contents);
        formData.append('thumbnail', thumbnail!);

        const result = await holdExhibition(formData);
        if (onResponseSuccess(result.status)) {
            router.push(`/exhibition/${result.data.id}`);
        } else alert('작품 등록에 실패했습니다.');
    };

    const onChangeTitleInput = (e: React.FormEvent) => {
        setTitleInput((e.target as HTMLInputElement).value);
    };

    const onChangeStartAt = (e: React.FormEvent) => {
        setStartAt((e.target as HTMLInputElement).value);
    };

    const onChangeEndAt = (e: React.FormEvent) => {
        setEndAt((e.target as HTMLInputElement).value);
    };

    const onChangeTheme = (e: React.FormEvent) => {
        setTheme((e.target as HTMLInputElement).value);
    };

    const onChangeCollaborator = (e: React.FormEvent) => {
        setCollaborator((e.target as HTMLInputElement).value);
    };

    const onChangeDescription = (e: React.FormEvent) => {
        setDescription((e.target as HTMLInputElement).value);
    };

    const onChangeThumbnail = (current: HTMLInputElement | null) => {
        current!.files && setThumbnail(current!.files[0]);
    };

    return {
        formInput: {
            titleInput,
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
