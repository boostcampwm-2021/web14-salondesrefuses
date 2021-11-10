import styled from '@emotion/styled';
import React, { useState, useRef, useEffect } from 'react';

import ColorPicker from './ColorPicker';
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
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [color, setColor] = useState('#000');
    const elementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!elementRef.current) return;
        elementRef.current.style.backgroundColor = color;
    }, [color]);

    const createRectangular = () => {
        const element: EditorElementProp = {
            type: EditorElementName.rectangular,
            style: initialRectStyle,
        };
        setElements([...elements, element]);
    };

    const onClickColorButton = () => {
        setShowColorPicker(!showColorPicker);
    };

    const onClickEditorElement = ({ target }: React.MouseEvent) => {
        elementRef.current = null;
        elementRef.current = target as HTMLDivElement;
    };

    const renderElements = () => {
        return elements.map((element, idx) => (
            <EditorElement
                onClick={onClickEditorElement}
                key={idx}
                style={element.style}
                type={EditorElementName.rectangular}
            ></EditorElement>
        ));
    };

    return (
        <EditorContainer>
            <ToolBar>
                <Button onClick={createRectangular}>Rectangular</Button>
                <Button onClick={onClickColorButton}>Color</Button>
                <Button>Text</Button>
                <Button>TextStyle</Button>
                {showColorPicker && (
                    <ColorPicker
                        color={color}
                        handleColor={(color) => {
                            setColor(color);
                        }}
                    />
                )}
            </ToolBar>
            <EditArea>{renderElements()}</EditArea>
        </EditorContainer>
    );
};

const initialRectStyle = {
    size: {
        width: 100,
        height: 100,
    },
    translate: {
        x: 0,
        y: 0,
    },
    backgroundColor: 'black',
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
    border-bottom: 1px solid black;
    position: relative;
`;
const Button = styled.button`
    width: 100px;
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
