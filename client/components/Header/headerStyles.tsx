import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { NavButton, RightContainer, SearchBarContainer } from './style';
import ProfilePic from '@assets/images/profile.png';
import { Session } from 'interfaces';

export const defaultHeader = (session: any) => {
    return (
        <RightContainer>
            <Link href="/exhibition">
                <NavButton>Exhibitions</NavButton>
            </Link>
            <Link href="/auction">
                <NavButton>Auctions</NavButton>
            </Link>
            <Link href={session ? '/mypage' : '/login'}>
                <NavButton>
                    {session ? (
                        <img src={ProfilePic.src} alt="profile" />
                    ) : (
                        'LogIn'
                    )}
                </NavButton>
            </Link>
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
                    <NavButton>
                        {isExhibition ? 'Auctions' : 'Exhibitions'}
                    </NavButton>
                </Link>
                <Link href={session ? '/mypage' : '/login'}>
                    <NavButton>
                        {session ? (
                            <img src={ProfilePic.src} alt="profile" />
                        ) : (
                            'LogIn'
                        )}
                    </NavButton>
                </Link>
            </RightContainer>
        </>
    );
};
