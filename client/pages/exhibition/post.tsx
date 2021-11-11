import React, { useState } from 'react';

import Layout from '@components/common/Layout';
import {
    ContentBody,
    ContentHeader,
    Description,
    NextButton,
    Title,
} from '@components/Exhibition/style';
import InputElement from '@components/Exhibition/Editor/InputElement';
import Editor from '@components/Exhibition/Editor';

const ExhibitionPostPage = () => {
    const [isEditor, setIsEditor] = useState(false);
    const changeEditor = (check: boolean) => {
        setIsEditor(check);
    };
    return (
        <Layout>
            <ContentHeader>
                <div>
                    <Title>
                        {isEditor ? 'Hold Exhibition' : 'Edit Exhibirion'}
                    </Title>
                    <Description>나만의 전시회를 만들어 보세요!</Description>
                </div>
                <div>
                    {isEditor ? (
                        <>
                            <NextButton onClick={() => changeEditor(false)}>
                                Prev
                            </NextButton>
                            <NextButton
                                onClick={() => console.log('done api 연결')}
                            >
                                Done
                            </NextButton>
                        </>
                    ) : (
                        <NextButton onClick={() => changeEditor(true)}>
                            Next
                        </NextButton>
                    )}
                </div>
            </ContentHeader>
            <ContentBody>
                {isEditor ? (
                    <Editor />
                ) : (
                    <InputElement changeEditor={changeEditor} />
                )}
            </ContentBody>
        </Layout>
    );
};

export default ExhibitionPostPage;
