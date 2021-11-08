import React from 'react';
import { Container, LogoContainer, Text, Hr, Copyright } from './styles';
import Image from 'next/image';
import Logo from '@assets/images/logo.png';

const Mobile = () => {
    return (
        <div>
            <Container>
                <div>
                    <LogoContainer>
                        <Image src={Logo} alt="logo" />
                        <p>Salon des Refusés</p>
                    </LogoContainer>
                    <Text>
                        벽전은 모바일을 준비중입니다. <br />
                        PC로 접속하여 주시면 감사하겠습니다.
                    </Text>
                    <Hr />
                    <Copyright>© salon des refuses, 2021</Copyright>
                </div>
            </Container>
        </div>
    );
};

export default Mobile;
