import React from 'react';
import { Exhibition } from 'interfaces';
import styled from '@emotion/styled';
import { EditorElementType, EditorElementStyle } from '@components/Exhibition/EditorPage/Editor/types';

const makeElement = () => {};

interface Props {
    contents: string;
    size: string;
}

interface contentStyles {
    tagName: EditorElementType;
    innerText?: string;
    imageSrc?: string;
    style: EditorElementStyle;
}

const ExhibitionContents = ({ contents, size }: Props) => {
    console.log(contents);
    return (
        <ElementContainer size={size}>
            {/* {JSON.parse(contents).map((content: contentStyles) => (
                <p>{content.tagName}</p>
            ))} */}
        </ElementContainer>
    );
};

interface ElementContainerProps {
    size: string;
}
const ElementContainer = styled.div<ElementContainerProps>`
    width: 1180px;
    height: ${(props) => props.size};
`;

export default ExhibitionContents;
