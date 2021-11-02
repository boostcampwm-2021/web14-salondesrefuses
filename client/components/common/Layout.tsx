import React from 'react';
import styled from '@emotion/styled';

import Header from '@components/Header';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Header />
            <Body>{children}</Body>
        </div>
    );
};

const Body = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 100px;
`;

export default Layout;
