import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';

import { EditorElementType, EditorElementStyle } from '@components/Exhibition/EditorPage/Editor/types';
import ExhibitionLazyImage from './ExhibitionLazyImage';

interface Props {
    contents: string;
    size: string;
    setModalNum: (n: string | undefined) => void;
}

interface ContentStyles {
    tagName: EditorElementType;
    innerText?: string;
    imageSrc?: string;
    artworkId?: string;
    style: EditorElementStyle;
}

const MakeElement = ({
    content,
    setModalNum,
}: {
    content: ContentStyles;
    setModalNum: (n: string | undefined) => void;
}) => {
    return content.tagName === 'IMAGE' && content.imageSrc ? (
        <ExhibitionLazyImage
            style={content.style as CSSProperties}
            imgUrl={content.imageSrc}
            setModalNum={setModalNum}
            artworkId={content.artworkId}
        />
    ) : (
        <AbsoluteDiv style={content.style as CSSProperties}>
            {content.tagName === 'TEXT' && <div dangerouslySetInnerHTML={{ __html: content.innerText || '' }}></div>}
        </AbsoluteDiv>
    );
};

const ExhibitionContents = ({ contents, size, setModalNum }: Props) => {
    return (
        <div>
            <ElementContainer size={size}>
                {JSON.parse(contents).map((content: ContentStyles, i: number) => (
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
    overflow: hidden;
`;

export default ExhibitionContents;
