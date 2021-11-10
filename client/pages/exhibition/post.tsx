import Layout from '@components/common/Layout';
import LabelInput from '@components/Exhibition/LabelInput';
import {
    ArtworkSelector,
    ArtworkSelectorHeader,
    ArtworkSelectorWrapper,
    ContentBody,
    ContentHeader,
    DataInput,
    Description,
    Input,
    Label,
    NextButton,
    TextArea,
    ThumbnailBox,
    Title,
} from '@components/Exhibition/style';
import Link from 'next/link';
import React, { useRef } from 'react';

const ExhibitionPostPage = () => {
    const thumbnailRef = useRef<HTMLInputElement>(null);
    return (
        <Layout>
            <ContentHeader>
                <Title>Hold Exhibition</Title>
                <Description>나만의 전시회를 만들어 보세요!</Description>
            </ContentHeader>
            <ContentBody>
                <DataInput>
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
                        <ThumbnailBox
                            onClick={() => thumbnailRef.current!.click()}
                        />
                        <Input ref={thumbnailRef} type="file" hidden />
                    </LabelInput>
                </DataInput>
                <ArtworkSelectorWrapper>
                    <ArtworkSelectorHeader>
                        <Label>작품 선택하기</Label>
                        <Link href="#">작품 추가하기</Link>
                    </ArtworkSelectorHeader>
                    <ArtworkSelector>
                        {/* @TODO 내 아트워크들 넣기 */}
                    </ArtworkSelector>
                </ArtworkSelectorWrapper>
                <NextButton>Next</NextButton>
            </ContentBody>
        </Layout>
    );
};

export default ExhibitionPostPage;
