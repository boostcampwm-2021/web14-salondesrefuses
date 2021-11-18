import React, { useState } from 'react';
import Link from 'next/link';
import { NavButton, RightContainer, SearchBarContainer } from './style';
import ProfilePic from '@assets/images/profile.png';

const getAvatar = (avatar: string | null) => {
    if (!avatar || avatar.length === 0) return ProfilePic.src;
    return avatar;
};

const routeMyPageOrLogin = (session: any) => {
    return () => {
        if (session) location.href = '/mypage';
        else location.href = '/login';
    };
};

export const defaultHeader = (session: any) => {
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

export const withSearchBar = (session: any, isExhibition: boolean) => {
    const [search, setSearch] = useState('');

    return (
        <>
            <SearchBarContainer>
                <input
                    value={search}
                    placeholder="Search by artist, gallery name, etc."
                    onChange={(e) => setSearch(e.target.value)}
                />
            </SearchBarContainer>
            <RightContainer>
                <Link href={isExhibition ? '/auction' : '/exhibition'}>
                    <NavButton>{isExhibition ? 'Auctions' : 'Exhibitions'}</NavButton>
                </Link>
                <a href="#" onClick={routeMyPageOrLogin(session)}>
                    <NavButton>{session ? <img src={getAvatar(session.avatar)} alt="profile" /> : 'LogIn'}</NavButton>
                </a>
            </RightContainer>
        </>
    );
};
