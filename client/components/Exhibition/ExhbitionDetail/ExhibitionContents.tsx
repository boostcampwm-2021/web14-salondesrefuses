import React from 'react';
import styled from '@emotion/styled';
import { EditorElementType, EditorElementStyle } from '@components/Exhibition/EditorPage/Editor/types';
import Image from 'next/image';

const MakeElement = ({
    content,
    setModalNum,
}: {
    content: contentStyles;
    setModalNum: (n: string | undefined) => void;
}) => {
    return content.tagName === 'IMAGE' && content.imageSrc ? (
        <AbsoluteImage style={content.style} onClick={() => setModalNum(content.artworkId)}>
            <Image
                src={content.imageSrc}
                alt={content.artworkId}
                width={content.style.width}
                height={content.style.height}
            />
        </AbsoluteImage>
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
const AbsoluteImage = styled.div`
    position: absolute;
    cursor: zoom-in;
`;

export default ExhibitionContents;
