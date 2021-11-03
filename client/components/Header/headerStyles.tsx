import React from 'react';
import Link from 'next/link';
import { NavButton, RightContainer, SearchBarContainer } from './style';
import ProfilePic from '@assets/images/profile.png';
import { useState } from 'react';

export const defaultHeader = () => {
    return (
        <RightContainer>
            <Link href="/exhibition">
                <NavButton>Exhibitions</NavButton>
            </Link>
            <Link href="/auction">
                <NavButton>Auctions</NavButton>
            </Link>
            <Link href="/mypage">
                <NavButton>
                    {/* if isLogindata ? imagedata : profilePic.src */}
                    <img src={ProfilePic.src} alt="profile" />
                </NavButton>
            </Link>
        </RightContainer>
    );
};

export const withSearchBar = (isExhibition: boolean) => {
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
                <Link href={isExhibition ? '/exhibition' : '/auction'}>
                    <NavButton>
                        {isExhibition ? 'Exhibitions' : 'Auctions'}
                    </NavButton>
                </Link>
                <Link href="/mypage">
                    <NavButton>
                        {/* if isLogindata ? imagedata : profilePic.src */}
                        <img src={ProfilePic.src} alt="profile" />
                    </NavButton>
                </Link>
            </RightContainer>
        </>
    );
};
