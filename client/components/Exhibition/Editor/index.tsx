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
    zIndex: number;
};

export interface EditorElementProp {
    type: EditorElementType;
    style: EditorElementStyle;
}

const Editor = () => {
    const [elements, setElements] = useState<EditorElementProp[]>([]);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [color, setColor] = useState('#000');
    const elementRef = useRef<HTMLDivElement | HTMLInputElement | null>(null);

    useEffect(() => {
        if (!elementRef.current) return;
        if (elementRef.current.tagName === 'DIV')
            elementRef.current.style.backgroundColor = color;
        if (elementRef.current.tagName === 'INPUT')
            elementRef.current.style.color = color;
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

    const createText = () => {
        const element: EditorElementProp = {
            type: EditorElementName.text,
            style: initialTextStyle,
        };
        setElements([...elements, element]);
    };

    const onClickZIndexButton = (direction: string) => {
        return () => {
            if (!elementRef.current) return;
            const z = elementRef.current.style.zIndex;
            if (direction === 'FORWARD')
                elementRef.current.style.zIndex = `${+z + 100}`;
            else elementRef.current.style.zIndex = `${+z - 100}`;
        };
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
                type={element.type}
            ></EditorElement>
        ));
    };

    return (
        <EditorContainer>
            <ToolBar>
                <Button onClick={createRectangular}>Rectangular</Button>
                <Button onClick={onClickColorButton}>Color</Button>
                <Button onClick={createText}>Text</Button>
                <Button onClick={onClickZIndexButton('FORWARD')}>
                    Forward
                </Button>
                <Button onClick={onClickZIndexButton('BACKWARD')}>
                    Backward
                </Button>
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
    zIndex: 100,
};

const initialTextStyle = {
    size: {
        width: 200,
        height: 50,
    },
    translate: {
        x: 0,
        y: 0,
    },
    backgroundColor: 'none',
    zIndex: 100,
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
