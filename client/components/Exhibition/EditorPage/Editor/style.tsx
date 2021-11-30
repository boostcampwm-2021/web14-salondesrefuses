import styled from '@emotion/styled';

interface EditorProps {
    height: number;
}

export const EditorContainer = styled.div<EditorProps>`
    width: 100%;
    height: ${(props) => props.height}px;
    border: 1px solid ${(props) => props.theme.color.gray1};
    overflow: hidden;
`;
export const ToolBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid ${(props) => props.theme.color.gray1};
    position: relative;
    padding-left: 30px;
`;
export const Button = styled.button<{ bg: string }>`
    width: 32px;
    height: 100%;
    background: url(${(props) => props.bg});
    background-repeat: no-repeat;
    background-position: center;
    border: none;

    &:hover {
        border-bottom: 2px solid black;
    }
`;

export const EditArea = styled.div<EditorProps>`
    position: relative;
    overflow: hidden;
    height: ${(props) => props.height}px;

    &:focus-visible {
        outline: none;
    }
`;
