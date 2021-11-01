import React from 'react';
import styled from '@emotion/styled';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            {/* NavBar(Header) */}
            <Body>{children}</Body>
        </div>
    );
};

const Body = styled.div``;

export default Layout;
