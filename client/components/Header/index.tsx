import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Logo from '@assets/images/logo.png';
import { HeaderContainer, LeftContainer, Hr, ImageContainer } from './style';
import { defaultHeader } from './headerStyles';
import useSessionState from '@store/sessionState';

const pathToObj = {
    '': { title: 'Main', root: '/' },
    artwork: { title: 'New Artwork', root: '/' },
    exhibition: { title: 'Exhibitions', root: '/exhibition' },
    auction: { title: 'Auction', root: '/auction' },
    mypage: { title: 'My Page', root: '/mypage' },
};
type mainPathInterface = '' | 'artwork' | 'exhibition' | 'auction' | 'mypage';

const Header = () => {
    const mainPath = useRouter().pathname.split('/')[1] as mainPathInterface;
    const session = useSessionState().contents;

    return (
        <HeaderContainer>
            <LeftContainer>
                <Link href="/">
                    <ImageContainer>
                        <Image src={Logo} alt="logo" />
                    </ImageContainer>
                </Link>
                <Hr />
                <Link href={pathToObj[mainPath].root}>{pathToObj[mainPath].title}</Link>
            </LeftContainer>
            {defaultHeader(session)}
        </HeaderContainer>
    );
};

export default Header;
