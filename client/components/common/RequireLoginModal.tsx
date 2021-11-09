import React from 'react';
import styled from '@emotion/styled';

import { Center, SpaceAround } from '@styles/common';

const RequireLoginModal = () => {
    return (
        <Container>
            <Modal></Modal>
        </Container>
    );
};

const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top; 0px;
  left: 0px;
  ${Center}
`;

const Modal = styled.div`
    width: 400px;
    height: 250px;
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    ${SpaceAround};
    flex-direction: column;
`;

export default RequireLoginModal;
