import React from 'react';
import styled from '@emotion/styled';

import Header from '@components/Header';
import Footer from '@components/Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Header />
            <Body>{children}</Body>
            <Footer />
        </div>
    );
};

const Body = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 100px;
    min-height: calc(100vh - 300px);
`;

export default Layout;
