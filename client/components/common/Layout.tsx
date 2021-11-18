import React from 'react';
import styled from '@emotion/styled';

import Header from '@components/Header';
import Footer from '@components/Footer';
import Toast from './Toast';

interface LayoutProps {
    children: React.ReactNode;
    horizontal?: boolean;
}

const Layout = ({ children, horizontal }: LayoutProps) => {
    return (
        <div>
            <Header />
            <Body horizontal={horizontal}>
                {children}
                <Toast />
            </Body>
            <Footer />
        </div>
    );
};

const Body = styled.div<{ horizontal?: boolean }>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-top: 70px;
    ${(props) => (props.horizontal ? 'flex-direction: row;' : 'flex-direction: column;')}
    min-height: calc(100vh - 270px);
    overflow-x: hidden;
`;

export default Layout;
