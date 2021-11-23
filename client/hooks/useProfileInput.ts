import { useState } from 'react';

interface IProfileInput {
    profile: File | null;
    nickname: string;
    socialId: string;
    description: string;
}

const initialInput = {
    profile: null,
    nickname: '',
    socialId: '',
    description: '',
};

const useProfileInput = () => {
    const [profileInput, setProfileInput] = useState<IProfileInput>(initialInput);

    const profileHandler = (file: File) => {
        setProfileInput({ ...profileInput, profile: file });
    };

    const onChangeNickname = (e: React.FormEvent) => {
        setProfileInput({ ...profileInput, nickname: (e.target as HTMLInputElement).value });
    };

    const onChangeSocialId = (e: React.FormEvent) => {
        setProfileInput({ ...profileInput, socialId: (e.target as HTMLInputElement).value });
    };

    const onChangeDescription = (e: React.FormEvent) => {
        setProfileInput({ ...profileInput, description: (e.target as HTMLTextAreaElement).value });
    };

    return {
        profileInput,
        profileHandler,
        onChangeNickname,
        onChangeSocialId,
        onChangeDescription,
    };
};

export default useProfileInput;
