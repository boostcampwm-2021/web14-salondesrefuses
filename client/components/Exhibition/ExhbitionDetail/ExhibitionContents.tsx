import React from 'react';
import { Exhibition } from 'interfaces';
import styled from '@emotion/styled';
import { EditorElementType, EditorElementStyle } from '@components/Exhibition/EditorPage/Editor/types';

const MakeElement = ({ content }: { content: contentStyles }) => {
    return content.tagName === 'IMAGE' ? (
        <AbsoluteImage style={content.style} src={content.imageSrc} onClick={(e) => console.log(e)} />
    ) : (
        <AbsoluteDiv style={content.style}>{content.tagName === 'TEXT' && content.innerText}</AbsoluteDiv>
    );
};

interface Props {
    contents: string;
    size: string;
}

interface contentStyles {
    tagName: EditorElementType;
    innerText?: string;
    imageSrc?: string;
    imageId?: number;
    style: EditorElementStyle;
}

const ExhibitionContents = ({ contents, size }: Props) => {
    return (
        <div>
            <ElementContainer size={size}>
                {JSON.parse(contents).map((content: contentStyles, i: number) => (
                    <MakeElement key={i} content={content} />
                ))}
            </ElementContainer>
        </div>
    );
};

interface ElementContainerProps {
    size: string;
}
const ElementContainer = styled.div<ElementContainerProps>`
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
