import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Logo from '@assets/images/logo.webp';
import { HeaderContainer, LeftContainer, Hr, ImageContainer } from './style';
import useSessionState from '@store/sessionState';
import dynamic from 'next/dynamic';
const DefaultHeader = dynamic(() => import('./headerStyles'), { ssr: false });

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
            {<DefaultHeader session={session} />}
        </HeaderContainer>
    );
};

export default Header;
