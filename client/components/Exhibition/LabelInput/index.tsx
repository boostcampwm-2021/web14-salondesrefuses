import styled from '@emotion/styled';
import { SpaceBetween } from '@styles/common';

interface LabelInputProps {
    label: string;
    children: React.ReactNode;
    require?: boolean;
}

const LabelInput = ({ label, children, require = false }: LabelInputProps) => {
    return (
        <Container>
            <label>
                {label}
                {require && '*'}
            </label>

            <div>{children}</div>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;

    & > label {
        width: 110px;
        margin-left: 8px;

        font: ${(props) => props.theme.font.textBase};
        color: ${(props) => props.theme.color.black};
    }

    & > div {
        ${SpaceBetween}

        width: calc(100% - 110px);
    }
`;

export default LabelInput;
