import React from 'react';
import styled from '@emotion/styled';

import checkedIcon from '@assets/images/checked.png';
import failureIcon from '@assets/images/failed.png';
import useToastState from '@store/toastState';

const Toast = () => {
    const [toast] = useToastState();
    return (
        <Container show={toast.show}>
            <img
                src={toast.success ? checkedIcon.src : failureIcon.src}
                alt=""
            />
            {toast.content}
        </Container>
    );
};

const Container = styled.div<{ show: boolean }>`
    position: absolute;
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(30px);
    width: 300px;
    height: 70px;
    visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
`;

export default Toast;
