import styled from '@emotion/styled';

export const Container = styled.div`
    z-index: 100;
    width: 80%;
    height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    & + img {
        position: absolute;
        width: 100vw;
        height: 100%;
        top: 0px;
        left: 0px;
        filter: blur(30px);
        transform: scale(1.5);
    }

    & > div > img {
        max-height: 400px;
        height: 35vh;
        border: 5px solid white;
        box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.4);
    }
    margin: 45px;
`;
export const Title = styled.section`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    z-index: 200;
    margin-bottom: 50px;

    & > h1 {
        color: white;
        font-weight: 200;
        font: ${(props) => props.theme.font.textEnXl};
    }
`;
export const Form = styled.div`
    width: 50%;
`;
export const Input = styled.div`
    margin-top: 30px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;

    & > span {
        font-weight: 200;
        font: ${(props) => props.theme.font.textEnLg};
        /* font-size: 24px; */
        color: black;
    }

    & > input {
        background: rgba(255, 255, 255, 0.5);
        color: black;
        height: 48px;
        border: none;
        border-radius: 10px;
        padding: 0px 15px;
        font: ${(props) => props.theme.font.textEnMd};
        font-size: 16px;

        &:focus {
            outline: none;
            box-shadow: 3px 5px 3px rgba(0, 0, 0, 0.1);
        }
    }
`;
