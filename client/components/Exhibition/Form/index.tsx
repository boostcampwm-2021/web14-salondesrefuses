import React, { useRef } from 'react';
import styled from '@emotion/styled';

import LabelInput from '../LabelInput';
import { Input, Label, TextArea, ThumbnailBox } from '../style';

const index = () => {
    const thumbnailRef = useRef<HTMLInputElement>(null);
    return (
        <Container>
            <LabelInput label="전시회 제목">
                <Input type="text" />
            </LabelInput>
            <LabelInput label="기간">
                <Input type="date" />
                <Label>부터</Label>
                <Input type="date" />
                <Label>까지</Label>
            </LabelInput>
            <LabelInput label="카테고리">
                {/* @TODO 카테고리 드랍다운 */}
                <Input type="type" />
            </LabelInput>
            <LabelInput label="협업">
                <Input type="type" />
            </LabelInput>
            <LabelInput label="설명">
                <TextArea />
            </LabelInput>
            <LabelInput label="전시회 썸네일">
                <ThumbnailBox onClick={() => thumbnailRef.current!.click()} />
                <Input ref={thumbnailRef} type="file" hidden />
            </LabelInput>
        </Container>
    );
};

const Container = styled.div`
    width: calc(60% - 30px);
    margin-right: 30px;

    & > div {
        margin-bottom: 20px;
    }
`;

export default index;
