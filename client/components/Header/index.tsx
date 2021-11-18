import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Logo from '@assets/images/logo.png';
import { HeaderContainer, LeftContainer, Hr, ImageContainer } from './style';
import { withSearchBar, defaultHeader } from './headerStyles';
import useSessionState from '@store/sessionState';

const pathToObj = {
    '': { title: 'Main', cb: defaultHeader },
    artwork: { title: 'New Artwork', cb: withSearchBar },
    exhibition: { title: 'Exhibitions', cb: withSearchBar },
    auction: { title: 'Auction', cb: withSearchBar },
    mypage: { title: 'My Page', cb: defaultHeader },
};
type mainPathInterface = '' | 'artwork' | 'exhibition' | 'auction' | 'mypage';
const Header = () => {
    console.log('hihi');
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
                <p>{pathToObj[mainPath].title}</p>
            </LeftContainer>
            {pathToObj[mainPath].cb(session, mainPath === 'exhibition')}
        </HeaderContainer>
    );
};

export default Header;
