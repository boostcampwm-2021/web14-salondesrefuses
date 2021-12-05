import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';

import emptyProfile from '@assets/images/mypage-profile.webp';
import { Center } from '@styles/common';

interface IProfileImage {
    profile: string;
    handler: (f: File) => void;
    image: File | null | undefined;
}

const ProfileImage = ({ profile, handler, image }: IProfileImage) => {
    const profileRef = useRef<HTMLImageElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const onClickProfile = () => {
        if (!inputRef.current) return;
        inputRef.current.click();
    };

    const onFileChange = ({ target }: React.FormEvent) => {
        if (!(target as HTMLInputElement).files || (target as HTMLInputElement).files?.length === 0) return;
        handler((target as HTMLInputElement).files![0]);
    };

    useEffect(() => {
        if (!image) return;
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            if (profileRef.current) {
                profileRef.current.src = e.target!.result as string;
            }
        };
        fileReader.readAsDataURL(image);
    }, [image]);

    return (
        <Container onClick={onClickProfile}>
            <img src={profile.length > 0 ? profile : emptyProfile.src} alt="" ref={profileRef} />
            <span>click to edit</span>
            <input type="file" ref={inputRef} onChange={onFileChange} accept=".png, .jpg, .jpeg" />
        </Container>
    );
};

const Container = styled.div`
    flex-direction: column;
    ${Center};

    & > img {
        width: 150px;
        height: 150px;
        border-radius: 75px;
        object-fit: cover;
    }

    & > span {
        margin-top: 10px;
        font: ${(props) => props.theme.font.textEnBase};
    }

    & > input {
        width: 0px;
        height: 0px;
        visibility: hidden;
    }
`;

export default ProfileImage;
