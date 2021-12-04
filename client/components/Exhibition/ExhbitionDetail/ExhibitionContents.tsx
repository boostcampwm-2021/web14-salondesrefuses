import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { EditorElementType, EditorElementStyle } from '@components/Exhibition/EditorPage/Editor/types';
import ExhibitionLazyImage from './ExhibitionLazyImage';

const MakeElement = ({
    content,
    setModalNum,
}: {
    content: contentStyles;
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
            {content.tagName === 'TEXT' && <div dangerouslySetInnerHTML={{ __html: content.innerHTML || '' }}></div>}
        </AbsoluteDiv>
    );
};

interface Props {
    contents: string;
    size: string;
    setModalNum: (n: string | undefined) => void;
}

interface contentStyles {
    tagName: EditorElementType;
    innerHTML?: string;
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
    overflow: hidden;
`;

export default ExhibitionContents;
