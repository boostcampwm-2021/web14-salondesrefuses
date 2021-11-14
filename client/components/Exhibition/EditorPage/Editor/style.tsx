import styled from '@emotion/styled';

export const EditorContainer = styled.div`
    width: 100%;
    height: 100vh;
    border: 1px solid ${(props) => props.theme.color.gray1};
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
export const EditArea = styled.div`
    position: relative;
    overflow: hidden;
    height: calc(100% - 50px);
`;
