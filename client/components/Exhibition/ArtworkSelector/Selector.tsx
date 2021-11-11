import React from 'react';
import styled from '@emotion/styled';

import useEditorImageState from '@store/editorImageState';

const Selector = () => {
    const [images, setImages] = useEditorImageState();

    return <Container></Container>;
};

const Container = styled.div`
    width: 100%;
    height: calc(100% - 54px);
    padding: 20px;

    background: #ededed;
`;

export default Selector;
