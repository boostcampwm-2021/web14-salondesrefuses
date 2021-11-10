import styled from '@emotion/styled';
import React, { useState, useRef } from 'react';
import EditorElement from './EditorElement';

enum EditorElementName {
    rectangular = 'RECTANGULAR',
    text = 'TEXT',
    image = 'IMAGE',
}
export type EditorElementType = 'RECTANGULAR' | 'TEXT' | 'IMAGE';
export type EditorElementStyle = {
    top: number;
    left: number;
    backgroundColor: string;
    size: { width: number; height: number };
};

export interface EditorElementProp {
    type: EditorElementType;
    style: EditorElementStyle;
}

const Editor = () => {
    const [elements, setElements] = useState<EditorElementProp[]>([]);
    const [currentElements, setCurrentElements] = useState<number[]>([]);

    const createRectangular = () => {
        const element: EditorElementProp = {
            type: EditorElementName.rectangular,
            style: {
                size: {
                    width: 100,
                    height: 100,
                },
                top: 0,
                left: 0,
                backgroundColor: 'black',
            },
        };
        setElements([...elements, element]);
    };

    const keyToCurrentElements = (keyyArr: number[]) => {
        setCurrentElements(keyyArr);
    };

    const renderElements = () => {
        return elements.map((element, idx) => (
            <EditorElement
                key={idx}
                idx={idx}
                style={element.style}
                type={EditorElementName.rectangular}
                currentElements={currentElements}
                keyToCurrentElements={keyToCurrentElements}
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
    height: 100vh;
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
