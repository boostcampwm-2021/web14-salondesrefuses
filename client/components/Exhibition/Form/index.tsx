import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';

import LabelInput from '../LabelInput';
import { Input, Label, TextArea, ThumbnailBox } from '../style';

const index = () => {
    const thumbnailRef = useRef<HTMLInputElement>(null);

    return (
        <Container>
            <LabelInput label="전시회 제목">
                <Input type="text" placeholder="제목을 입력해주세요." />
            </LabelInput>
            <LabelInput label="기간">
                <Input type="date" placeholder="전시회 시작 일자" />
                <Label>부터</Label>
                <Input type="date" placeholder="전시회 종료 일자" />
                <Label>까지</Label>
            </LabelInput>
            <LabelInput label="테마">
                <Input
                    type="type"
                    placeholder="전시회의 느낌을 작성해보세요!"
                />
            </LabelInput>
            <LabelInput label="카테고리">
                <Input type="type" placeholder="카테고리를 작성해주세요." />
            </LabelInput>
            <LabelInput label="협업">
                <Input
                    type="type"
                    placeholder="작품을 만드는데 도움을 주신 분을 작성해주세요!"
                />
            </LabelInput>
            <LabelInput label="설명">
                <TextArea placeholder="설명을 작성해주세요!" />
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
        margin-bottom: 40px;
    }
`;

export default index;
