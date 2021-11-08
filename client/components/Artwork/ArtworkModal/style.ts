import styled from '@emotion/styled';

export const Modal = styled.div<{ bottom: string }>`
    position: absolute;
    width: 70%;
    max-width: 800px;
    height: 600px;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(100px);
    border-radius: 30px;
    padding: 40px;
    bottom: ${(props) => props.bottom};
    z-index: 500;

    & span {
        font: ${(props) => props.theme.font.textEnBase};
        font-weight: 200;
    }

    transition: bottom 0.2s ease;
`;
export const ConfirmButton = styled.button`
    width: 130px;
    height: 40px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background: none;
    border-radius: 10px;
    color: white;
    font: ${(props) => props.theme.font.textEnBase};
    position: absolute;
    bottom: 50px;
    right: 50px;
`;
export const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 30px;

    & textarea {
        height: 150px;
        border-radius: 15px;
        background: rgba(0, 0, 0, 0.24);
        border: none;
        color: white;
        padding: 20px;
        resize: none;

        &:focus {
            outline: none;
        }
    }

    & span {
        font: ${(props) => props.theme.font.textEnMd};
        color: white;
    }
`;
export const LightForm = styled(Form)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: relative;

    & input {
        border-radius: 8px;
        height: 35px;
        width: 80%;
        background: rgba(0, 0, 0, 0.24);
        border: none;
        color: white;
        padding-left: 20px;

        &: focus {
            outline: none;
        }
    }

    & p {
        position: absolute;
        right: 10px;
        font: ${(props) => props.theme.font.textEnSm};
        font-size: 14px;
        color: red;
    }

    & > div {
        width: 80%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        font: ${(props) => props.theme.font.textEnMd};

        & input {
            width: 90%;
        }

        & div {
            width: 100%;
            position: relative;
            display: flex;
            align-items: center;

            & > p {
                right: 12%;
            }
        }
    }
`;
