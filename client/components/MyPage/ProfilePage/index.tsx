import React, { useState } from 'react';
import styled from '@emotion/styled';

import { Session } from 'interfaces';
import ProfileImage from './ProfileImage';
import { BlackButton, Button } from '@styles/common';
import useToastState from '@store/toastState';

interface IPRofilePage {
    user: Session;
}

const ProfilePage = ({ user }: IPRofilePage) => {
    const [profile, setProfile] = useState<File | null>();
    const [nickname, setNickname] = useState<string>('');
    const [socialId, setSocialId] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [toast, setToast] = useToastState();

    const profileHandler = (file: File) => {
        setProfile(file);
    };

    const onChangeNickname = (e: React.FormEvent) => {
        setNickname((e.target as HTMLInputElement).value);
    };

    const onChangeSocialId = (e: React.FormEvent) => {
        setSocialId((e.target as HTMLInputElement).value);
    };

    const onChangeDescription = (e: React.FormEvent) => {
        setDescription((e.target as HTMLTextAreaElement).value);
    };

    const onClickSave = (e: MouseEvent) => {
        // TODO: api 명세 확인해서 formdata 쏘기
        //! 폼데이터 키값 임의로 작성한 것. 정확하지 않음.
        const formData = new FormData();
        formData.append('nickname', nickname);
        formData.append('socialId', socialId);
        formData.append('description', description);
        profile && formData.append('profile', profile);

        setToast({
            show: true,
            content: '프로필이 업데이트되었습니다.',
        });
    };

    return (
        <Container>
            <ProfileImage profile={user.avatar || ''} handler={profileHandler} image={profile} />
            <Form>
                <div>
                    <span>닉네임</span>
                    <input type="text" value={nickname} onChange={onChangeNickname} />
                </div>
                <div>
                    <span>Social ID</span>
                    <input type="text" value={socialId} onChange={onChangeSocialId} />
                </div>
                <div>
                    <span>설명</span>
                    <textarea name="" id="" cols={50} rows={10} value={description} onChange={onChangeDescription} />
                </div>
            </Form>
            <BlackButton>Save</BlackButton>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
    overflow: scroll;
    width: 70%;
    font: ${(props) => props.theme.font.textMd};
    font-size: 1em;

    & > button {
        align-self: self-end;
    }
`;

const Form = styled.div`
    & > div {
        display: flex;
        align-items: center;
        margin: 40px 0;
    }
    & span {
        display: block;
        width: 100px;
    }

    & input {
        border: none;
        padding: 2px 10px;
        border-bottom: 1px solid ${(props) => props.theme.color.placeholder};

        &:focus {
            border-bottom: 1px solid black;
            outline: none;
        }
    }

    & textarea {
        border: 1px solid ${(props) => props.theme.color.placeholder};
        resize: none;
        padding: 10px 10px;

        &:focus {
            outline: none;
            border-bottom: 1px solid black;
        }
    }
`;

export default ProfilePage;
