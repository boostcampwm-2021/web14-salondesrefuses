import React from 'react';
import styled from '@emotion/styled';
import Web3 from 'web3';

import { Session } from 'interfaces';
import ProfileImage from './ProfileImage';
import { BlackButton } from '@styles/common';
import { onResponseSuccess, signOut, updateUserData } from 'service/networking';
import useProfileInput from '@hooks/useInputProfile';
import useToast from '@hooks/useToast';

interface IPRofilePage {
    user: Session;
}

const ProfilePage = ({ user }: IPRofilePage) => {
    const { profileInput, profileHandler, onChangeDescription, onChangeNickname, onChangeSocialId } = useProfileInput();
    const showLogoutToast = useToast({
        onSuccess: '로그아웃 되었습니다.',
        onFailed: '',
    });
    const showProfileUpdateToast = useToast({
        onSuccess: '프로필이 업데이트되었습니다.',
        onFailed: '프로필 업데이트에 실패했습니다.',
    });
    const { profile, nickname, socialId, description } = profileInput;

    const onClickLogout = async () => {
        const res = await signOut(`${user.id}`);
        if (onResponseSuccess(res.status)) {
            const expire = new Date(0);
            document.cookie = 'accessToken=; expires=' + expire.toString();
            document.cookie = 'refreshToken=; expires=' + expire.toString();
            showLogoutToast('success');
            window.location.href = '/';
        }
    };

    const onClickSave = async (e: React.MouseEvent) => {
        const formData = new FormData();
        formData.append('name', nickname);
        formData.append('snsId', socialId);
        formData.append('description', description);
        profile && formData.append('image', profile);

        const res = await updateUserData(formData);
        if (onResponseSuccess(res.status)) {
            showProfileUpdateToast('success');
        } else {
            showProfileUpdateToast('failed');
        }
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
            <ButtonContainer>
                <BlackButton onClick={onClickLogout}>Log out</BlackButton>
                <BlackButton onClick={onClickSave}>Save</BlackButton>
            </ButtonContainer>
        </Container>
    );
};

const ETHEREUM_HOST = process.env.ETHEREUM_HOST;

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

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    ailgn-items: center;
    gap: 30px;
`;

export default ProfilePage;

// ganache-cli --account "0x70f1384b24df3d2cdaca7974552ec28f055812ca5e4da7a0ccd0ac0f8a4a9b00,9000000000000000000000"
