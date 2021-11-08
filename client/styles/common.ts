import styled from '@emotion/styled';

export const Center = `
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SpaceBetween = `
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const SpaceAround = `
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const SpaceEvenly = `
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
export const Button = styled.button`
    height: 30px;
    padding: 0px 5px;
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.color.white};
    background: none;
    font-size: 20px;
    font-weight: 200;
    color: ${(props) => props.theme.color.white};

    &:hover {
        color: ${(props) => props.theme.color.primary};
        border-bottom: 2px solid ${(props) => props.theme.color.primary};
    }
`;
export const BlackButton = styled(Button)`
    color: ${(props) => props.theme.color.black};
    border-bottom: 2px solid ${(props) => props.theme.color.black};
    &:hover {
        color: ${(props) => props.theme.color.primary};
        border-bottom: 2px solid ${(props) => props.theme.color.primary};
    }
`;
