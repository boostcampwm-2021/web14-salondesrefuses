import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { NavButton, RightContainer, SearchBarContainer } from './style';
import ProfilePic from '@assets/images/profile.png';
import parseCookie from '@utils/parseCookie';

export const defaultHeader = () => {
    const [session, setSession] = useState(false);
    useEffect(() => {
        const isLoggedIn = parseCookie()('accessToken') ? true : false;
        setSession(isLoggedIn);
    }, []);

    return (
        <RightContainer>
            <Link href="/exhibition">
                <NavButton>Exhibitions</NavButton>
            </Link>
            <Link href="/auction">
                <NavButton>Auctions</NavButton>
            </Link>
            <Link href="/login">
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

export const withSearchBar = (isExhibition: boolean) => {
    const [session, setSession] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const isLoggedIn = parseCookie()('accessToken') ? true : false;
        setSession(isLoggedIn);
    }, []);

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
                <Link href="/login">
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
