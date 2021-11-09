import styled from '@emotion/styled';
import React, { useState } from 'react';
import { addClass } from './utils';
import EditorElement from './EditorElement';

enum EditorElementName {
    rectangular = 'RECTANGULAR',
    text = 'TEXT',
    image = 'IMAGE',
}
export type EditorElementType = 'RECTANGULAR' | 'TEXT' | 'IMAGE';
export type EditorElementStyle = {
    translate: { x: number; y: number };
    backgroundColor: string;
    size: { width: number; height: number };
};

export interface EditorElementProp {
    type: EditorElementType;
    style: EditorElementStyle;
}

const Editor = () => {
    const [elements, setElements] = useState<EditorElementProp[]>([]);
    const addRectangular = () => {};

    const createRectangular = () => {
        const element: EditorElementProp = {
            type: EditorElementName.rectangular,
            style: {
                size: {
                    width: 100,
                    height: 100,
                },
                translate: {
                    x: 0,
                    y: 0,
                },
                backgroundColor: 'black',
            },
        };
        setElements([...elements, element]);
    };

    const renderElements = () => {
        return elements.map((element, idx) => (
            <EditorElement
                key={idx}
                style={element.style}
                type={EditorElementName.rectangular}
            ></EditorElement>
        ));
    };

    return (
        <EditorContainer>
            <ToolBar>
                <Button onClick={createRectangular}>R</Button>
                <Button>C</Button>
                <Button>T</Button>
                <Button>Ts</Button>
            </ToolBar>
            <EditArea>{renderElements()}</EditArea>
        </EditorContainer>
    );
};

const EditorContainer = styled.div`
    width: 800px;
    border: 1px solid ${(props) => props.theme.color.gray1};
`;

const ToolBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 50px;
`;
const Button = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 8px;
    &:hover {
        background-color: ${(props) => props.theme.color.gray1};
    }
`;
const EditArea = styled.div`
    position: relative;
`;
export default Editor;
