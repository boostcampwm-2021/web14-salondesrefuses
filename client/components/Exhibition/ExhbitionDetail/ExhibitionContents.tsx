import React, { useState } from 'react';
import styled from '@emotion/styled';
import { EditorElementType, EditorElementStyle } from '@components/Exhibition/EditorPage/Editor/types';

const MakeElement = ({
    content,
    setModalNum,
}: {
    content: contentStyles;
    setModalNum: (n: string | undefined) => void;
}) => {
    return content.tagName === 'IMAGE' ? (
        <AbsoluteImage style={content.style} src={content.imageSrc} onClick={() => setModalNum(content.artworkId)} />
    ) : (
        <AbsoluteDiv style={content.style}>{content.tagName === 'TEXT' && content.innerText}</AbsoluteDiv>
    );
};

interface Props {
    contents: string;
    size: string;
    setModalNum: (n: string | undefined) => void;
}

interface contentStyles {
    tagName: EditorElementType;
    innerText?: string;
    imageSrc?: string;
    artworkId?: string;
    style: EditorElementStyle;
}

const ExhibitionContents = ({ contents, size, setModalNum }: Props) => {
    return (
        <div>
            <ElementContainer size={size}>
                {JSON.parse(contents).map((content: contentStyles, i: number) => (
                    <MakeElement key={i} content={content} setModalNum={setModalNum} />
                ))}
            </ElementContainer>
        </div>
    );
};

const ElementContainer = styled.div<{ size: string }>`
    position: relative;
    width: 1180px;
    height: ${(props) => props.size};
`;
const AbsoluteDiv = styled.div`
    position: absolute;
`;
const AbsoluteImage = styled.img`
    position: absolute;
`;

export default ExhibitionContents;
