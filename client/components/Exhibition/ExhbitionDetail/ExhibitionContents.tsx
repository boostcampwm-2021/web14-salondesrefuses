import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';

import { EditorElementType, EditorElementStyle } from '@components/Exhibition/EditorPage/Editor/types';

interface Props {
    contents: string;
    size: string;
    setModalNum: (n: string | undefined) => void;
}

interface ContentStyles {
    tagName: EditorElementType;
    innerHTML?: string;
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
        <AbsoluteImage
            style={content.style as CSSProperties}
            imgUrl={content.imageSrc}
            onClick={() => setModalNum(content.artworkId)}
        />
    ) : (
        <AbsoluteDiv style={content.style as CSSProperties}>
            {content.tagName === 'TEXT' && <div dangerouslySetInnerHTML={{ __html: content.innerHTML || '' }}></div>}
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
const AbsoluteImage = styled.div<{ imgUrl: string }>`
    position: absolute;
    cursor: zoom-in;
    background-image: url(${(props) => props.imgUrl});
    background-size: contain;
    background-repeat: no-repeat;
`;

export default ExhibitionContents;
