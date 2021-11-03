import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Logo from '@assets/images/logo.png';
import { HeaderContainer, LeftContainer, Hr, ImageContainer } from './style';
import { withSearchBar, defaultHeader } from './headerStyles';

const pathToObj = {
    '': { title: 'Main', cb: defaultHeader },
    artwork: { title: 'New Artwork', cb: withSearchBar },
    exhibition: { title: 'Exhibitions', cb: withSearchBar },
    auction: { title: 'Auction', cb: withSearchBar },
    mypage: { title: 'My Page', cb: defaultHeader },
};
type mainPathInterface = '' | 'artwork' | 'exhibition' | 'auction' | 'mypage';
const Header = () => {
    const mainPath = useRouter().pathname.split('/')[1] as mainPathInterface;
    console.log(pathToObj[mainPath]);

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
            {pathToObj[mainPath].cb(mainPath === 'exhibition')}
        </HeaderContainer>
    );
};

export default Header;
