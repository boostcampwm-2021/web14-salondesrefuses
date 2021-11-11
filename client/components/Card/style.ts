import styled from '@emotion/styled';
interface CardContainerProps {
    thumbnailImage: string;
    width: number;
}
export const CardContainer = styled.div<CardContainerProps>`
    display: flex;
    width: ${(props) => props.width}px;
    height: ${(props) => (props.width * 3) / 2}px;
    background-image: url(${(props) => props.thumbnailImage});
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 100%;
    border-radius: 20px;
    cursor: pointer;
`;
export const BlurBottom = styled.div`
    display: flex;
    color: ${(props) => props.theme.color.white};
    height: 30%;
    width: 100%;
    align-self: flex-end;
    background: linear-gradient(
        180deg,
        rgba(175, 175, 175, 0) 0%,
        rgba(44, 44, 44, 0.47) 77.08%,
        #2d2d2d 100%
    );
    border-radius: 0px 0px 20px 20px;
    backdrop-filter: blur(20px);
    padding: 20px;
    div {
        width: 100%;
    }
    img {
        margin-right: 10px;
    }
`;
export const BlurFull = styled.div`
    height: 100%;
    width: 100%;
    border-radius: 20px;
    padding: 20px;
    background: rgba(0, 0, 0, 0.4);
    color: ${(props) => props.theme.color.white};
    animation: growblur 1s ease-out;
    backdrop-filter: blur(20px);
    box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.3);

    @keyframes growblur {
        0% {
            backdrop-filter: blur(4px);
            background: rgba(0, 0, 0, 0);
        }
        100% {
            backdrop-filter: blur(20px);
            background: rgba(0, 0, 0, 0.4);
        }
    }
`;

interface textAlign {
    align?: string;
}
export const Title = styled.p<textAlign>`
    font: ${(props) => props.theme.font.textEnMd};
    margin: 10px auto;
    text-align: ${(props) => props.align || 'left'};
`;
export const P = styled.p<textAlign>`
    font: ${(props) => props.theme.font.textEnSm};
    margin: 10px auto;
    text-align: ${(props) => props.align || 'left'};
`;
export const Price = styled.p`
    margin-right: 10px;
    font: ${(props) => props.theme.font.textEnSm};
`;
export const PriceContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
`;
