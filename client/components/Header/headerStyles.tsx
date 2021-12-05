import React from 'react';
import Link from 'next/link';
import { NavButton, RightContainer } from './style';
import ProfilePic from '@assets/images/profile.png';

const getAvatar = (avatar: string | undefined) => {
    if (hasAvatar(avatar)) return ProfilePic.src;
    return avatar;
};

const routeMyPageOrLogin = (session: any) => {
    return () => {
        location.href = session ? '/mypage' : '/login';
    };
};

const DefaultHeader = ({ session }: { session: any }) => {
    return (
        <RightContainer>
            <Link href="/exhibition">
                <NavButton>Exhibitions</NavButton>
            </Link>
            <Link href="/auction">
                <NavButton>Auctions</NavButton>
            </Link>
            <a href="#" onClick={routeMyPageOrLogin(session)}>
                <NavButton>{session ? <img src={getAvatar(session.avatar)} alt="profile" /> : 'LogIn'}</NavButton>
            </a>
        </RightContainer>
    );
};

const hasAvatar = (avatar: string | undefined) => {
    if (!avatar || avatar.length === 0) return true;
    return false;
};

export default DefaultHeader;
