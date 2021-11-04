import React from 'react';
import styled from '@emotion/styled';

import Header from '@components/Header';
import Footer from '@components/Footer';
import { Center } from '@styles/common';

interface LayoutProps {
    children: React.ReactNode;
    vertical?: boolean;
}

const Layout = ({ children, vertical }: LayoutProps) => {
    return (
        <div>
            <Header />
            <Body vertical={vertical}>{children}</Body>
            <Footer />
        </div>
    );
};

const Body = styled.div<{ vertical?: boolean }>`
    ${Center}
    flex-direction: column;
    padding-top: 100px;
    ${(props) =>
        props.vertical ? 'flex-direction: column;' : 'flex-direction: row;'}
    min-height: calc(100vh - 300px);
`;

export default Layout;
